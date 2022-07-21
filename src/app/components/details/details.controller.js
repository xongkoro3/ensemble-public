function detailsControl(PartyModel, GetSongName, $stateParams) {
    let $ctrl = this;

    //ToDO how to pass data in?
    PartyModel.getById($stateParams.id).then(function (res) {
        console.log(res.attributes);
        $ctrl.party = res.attributes;
    });


    //var result = GetSongName.spotifyMaster();
    //console.log(result);
    GetSongName.spotifyMaster().then(function (uri) {
        console.log("THIS IS URI BELOW");
        console.log(uri);
        $ctrl.songCode = uri;
    });
};

angular
    .module('components')
    .controller('detailsControl', detailsControl);