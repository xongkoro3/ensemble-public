function AppController($http) {
    var ctrl = this;
    // ctrl.user = AuthService.getUser();

    /**
     * @ngdoc method
     * @name AppController#logout
     *
     * @description Logout :)
     */
    // ctrl.logout = function () {
    //   AuthService.logout().then(function () {
    //     $state.go('auth.login');
    //   });
    // };
    // $http.get("http://localhost:8888/api/codes")
    //     .then(function(response) {
    //         var access_token = response.data;
    //         console.log(access_token);
    //     });
}

/**
 * @ngdoc type
 * @module common
 * @name AppController
 *
 * @description
 */
angular
    .module('common')
    .controller('AppController', AppController);
