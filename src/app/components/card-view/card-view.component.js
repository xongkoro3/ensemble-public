var cardView = {
    templateUrl: './card-view.html',
    controller: 'cardViewController'
}

angular.module('components.map-view').
component('cardView', cardView)
    .config(function($stateProvider) {
        $stateProvider
            .state('cards', {
                parent: 'app',
                url: 'cards',
                component: 'cardView',
                resolve: {
                    parties: function(PartyModel) {
                        return PartyModel.getAllParties()
                    }
                }
            });
    });
