/* Party Model */
angular.module('components.auth')
    .config(['ParseProvider', function (ParseProvider) {
        var MY_PARSE_APP_ID = 'CaISb3EXwVEVKouyPkkRavAVyMZa0jX5NKfZtTVT';
        var MY_PARSE_JS_KEY = '5C4ukztPEsueltHOgGFZMAstODTqUGIAMxHWAIH5';
        ParseProvider.initialize(MY_PARSE_APP_ID, MY_PARSE_JS_KEY);
        ParseProvider.serverURL = 'https://parseapi.back4app.com';
    }]);

var AuthService = function (Parse, $http) {
    this.signUp = signUp;
    this.onSignIn = onSignIn;
    this.isSignedIn = isSignedIn;

    function signUp(user) {
        // Create a new instance of the user class
        var newUser = new Parse.User();
        newUser.set("password", user.password);
        newUser.set("email", user.email);
        newUser.set("username", user.username);

        // other fields can be set just like with Parse.Object
        // newUser.set("phone", "415-392-0202");

        newUser.signUp().then(function (newUser) {
            console.log('User created successful with name: ' + newUser.get("username") + ' and email: ' + newUser.get("email"));
            onSignIn(user);
        }).catch(function (error) {
            console.log("Error: " + error.code + " " + error.message);
        });
    }

    function onSignIn(user) {
        Parse.User.logIn(user.username, user.password).then((user) => {
            // Do stuff after successful login
            console.log('Logged in user', user);
            window.localStorage.setItem('sessionToken', user.attributes.sessionToken);
            location.reload();
        }).catch(error => {
            console.error('Error while logging in user', error);
        })

    }

    // Checks if user is signed in
    function isSignedIn() {
        var sessionToken = window.localStorage.getItem('sessionToken');
        // if (!sessionToken) {
        //   return false;
        // }
        console.log('st: ' + sessionToken);
        return $http({
            method: 'GET',
            url: 'https://parseapi.back4app.com/users/me',
            headers: {
                'X-Parse-Application-Id': 'CaISb3EXwVEVKouyPkkRavAVyMZa0jX5NKfZtTVT',
                'X-Parse-REST-API-Key': 'pz2xGPaCY2iTa26go8zlOuxnDvNKLuzzwwhD9nCj',
                'X-Parse-Session-Token': sessionToken
            }
        }).then(function mySuccess(response) {
            var user = {
                username: response.data.username,
                isAuth: "true",
            }
            window.sessionStorage.setItem('user', JSON.stringify(user));
            return response;
        }, function (err) {
            console.log(err);
        });
    }

}

/**
 * @ngdoc service
 * @name AuthService
 * @module components.auth
 *
 * @description Provides HTTP methods for our firebase authentification.
 *
 */
angular
    .module('root')
    .service('AuthService', AuthService);