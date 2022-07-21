function AppToolbarController($timeout, $mdSidenav, $log, Dialog, AuthService) {
    var $ctrl = this;
    $ctrl.toggleLeft = buildToggler('left');

    $ctrl.isOpenLeft = function() {
        return $mdSidenav('left').isOpen();
    };

    function debounce(func, wait, context) {
        var timer;
        return function debounced() {
            var context = $ctrl,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
        return debounce(function() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function() {
                    $log.debug("toggle " + navID + " is done");
                });
        }, 200);
    }

    function buildToggler(navID) {
        return function() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function() {
                    $log.debug("toggle " + navID + " is done");
                });
        };
    }

    $ctrl.showDialog = function(ev) {
        Dialog.showDialog(ev);
    };

    AuthService.isSignedIn().then(function(res) {
        if (res) {
            console.log(res);
            $ctrl.username = res.data.username;
        }
    }, function(err) {
        console.log(err);
    });

    // Logs out user
    $ctrl.logOut = function(ev) {
        window.localStorage.removeItem('sessionToken');
        if (window.sessionStorage.getItem('user')) {
            window.sessionStorage.removeItem('user');
        }
        location.reload();
    }

}

angular
    .module('common')
    .controller('AppToolbarController', AppToolbarController);
