var app = {
    templateUrl: './app.html',
    controller: 'AppController'
};

/**
 * @ngdoc directive
 * @name app
 * @module common
 *
 * @description
 * @usage
 *
 * ### How to use
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 **/
angular
    .module('common')
    .component('app', app)
    .config(function($stateProvider) {
        // $stateProvider
        //     .state('app', {
        //     redirectTo: 'components.map-view',
        //     url: '/',
        //     component: 'app'
        // });

        $stateProvider
            .state('app', {
                name: 'app',
                url: "/",
                component: 'app'
            });
    });
