function AppSidebarController($mdSidenav, $state) {
    let $ctrl = this;

    $ctrl.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
    };
    $ctrl.getParties = function () {
        $state.go('cards');
    }
}
/**
 *
 * @ngdoc type
 * @module common
 * @name AppSidebarController
 *
 * @description
 *
 */
angular
    .module('common')
    .controller('AppSidebarController', AppSidebarController);