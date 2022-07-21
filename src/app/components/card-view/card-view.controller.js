function cardViewController(PartyModel, $mdToast) {
    let $ctrl = this;

    function loadAllPartyFromParse() {

        // Gets a list of all parties to generate cards.
        PartyModel.getAllParties().then(function (results) {
            $ctrl.parties = results;
            countLikes();
        });

    }
    loadAllPartyFromParse();

    function countLikes() {
        var user = JSON.parse(window.sessionStorage.getItem('user'));
        var username = user.username;
        $ctrl.parties.forEach(function (party) {
            $ctrl[party.id] = {};
            if (party.attributes.likes) {
                console.log('hi');
                if (party.attributes.likes.includes(username)) {
                    $ctrl[party.id].userVotes = 1;
                }
            }

        });
        $ctrl.doVote = function (id) {
            if ($ctrl[id].userVotes == 1) {
                delete $ctrl[id].userVotes;
                PartyModel.removeUserFromParty(id, username).then(
                    showToast('You are no longer interested in the party.')
                );
            } else {
                $ctrl[id].userVotes = 1;
                console.log(window.sessionStorage.getItem('user'));
                PartyModel.addUserToParty(id, username).then(
                    showToast('You liked this party!')
                );

            }
        }
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
    .module('components.map-view')
    .controller('cardViewController', cardViewController);