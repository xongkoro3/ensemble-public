var partyDetails = {
    templateUrl: './details.html',
    controller: 'detailsControl'
}

angular.module('components')
    .component('partyDetails', partyDetails)
    .config(function ($stateProvider) {
        $stateProvider
            .state('details', {
                parent: 'app',
                url: 'details/:id/',
                component: 'partyDetails',
                resolve: {
                    party: function (PartyModel, $stateParams) {
                        PartyModel.getById($stateParams.id).then(function (res) {
                            return res.attributes;
                        });
                    }
                }
            });
    });