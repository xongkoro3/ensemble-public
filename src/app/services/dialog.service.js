var Dialog = function ($window, $mdDialog, $mdToast, PartyModel, AuthService) {
    this.showDialog = showDialog;
    this.showToast = showToast;

    var loginController = function () {
        var ctrl = this;

        ctrl.close = function () {
            $mdDialog.cancel();
        }

        ctrl.login = function () {
            var user = {};
            user['username'] = this.username;
            user['password'] = this.password;
            AuthService.onSignIn(user);
            $mdDialog.hide({
                username: this.username
            });
        }
    }

    var registerController = function () {
        var ctrl = this;

        ctrl.close = function () {
            $mdDialog.cancel();
        }

        ctrl.register = function () {
            var user = {};
            user['username'] = this.username;
            user['email'] = this.email;
            user['password'] = this.password;
            AuthService.signUp(user);
            $mdDialog.hide({
                username: this.username
            });
        }
    }

    var formController = function () {
        var ctrl = this;

        ctrl.close = function () {
            $mdDialog.cancel();
        }

        ctrl.addParty = function () {
            PartyModel.addParty(ctrl.party);
            $mdDialog.hide({
                name: ctrl.party.name
            });
            setTimeout(function () {
                $window.location.reload();
            }, 1000);

        }

    }

    // Depending on button clicked, dialog populated with appropriate content.
    function showDialog(event) {
        if (event.target.id == 'addParty') {
            const user = JSON.parse(window.sessionStorage.getItem('user'));
            if (user && user.isAuth == 'true') {
                $mdDialog.show({
                    clickOutsideToClose: true,
                    preserveScope: true,
                    templateUrl: './form.html',
                    controller: formController,
                    controllerAs: 'form',
                }).then(credentials =>
                    this.showToast(`Party: ${credentials.name} added.`),
                    () => this.showToast('Party creation cancelled'));
            } else {
                $mdDialog.show({
                    clickOutsideToClose: true,
                    preserveScope: true,
                    templateUrl: './login.html',
                    controller: loginController,
                    controllerAs: 'dialog',
                }).then(credentials =>
                    this.showToast(`Thanks for logging in, ${credentials.username}.`),
                    () => this.showToast('You cancelled the log in.'));
            }

        } else if (event.target.id == 'login') {
            $mdDialog.show({
                clickOutsideToClose: true,
                preserveScope: true,
                templateUrl: './login.html',
                controller: loginController,
                controllerAs: 'dialog',
            }).then(credentials =>
                this.showToast(`Thanks for logging in, ${credentials.username}.`),
                () => this.showToast('You cancelled the log in.'));
        } else {
            $mdDialog.show({
                clickOutsideToClose: true,
                preserveScope: true,
                targetEvent: event,
                templateUrl: './register.html',
                controller: registerController,
                controllerAs: 'dialog',
            }).then(credentials =>
                this.showToast(`Thanks for signing up, ${credentials.username}.`),
                () => this.showToast('You cancelled the sign up.'));
        }
    }

    function displayDialog(templateUrl, type) {

    }

    function showToast(content) {
        $mdToast.show(
            $mdToast.simple()
            .content(content)
            .position('bottom right')
            .hideDelay(3500)
        );
    }
}

angular
    .module('root')
    .service('Dialog', Dialog);