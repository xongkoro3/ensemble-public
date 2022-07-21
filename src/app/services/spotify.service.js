var GetSongName = function ($http) {
    this.getURI = getURI;
    this.spotifyMaster = spotifyMaster;

    function getURI(access_token) {
        return $http({
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/player/currently-playing',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': undefined
            }
        }).then(function mySuccess(response) {
            var myCode = response.data.item.id;
            return myCode;
        }, function (err) {
            console.log(err);
        });
    }

    function spotifyMaster() {
        return $http.get("http://localhost:8888/api/codes")
            .then(function (resp) {
                console.log(resp.data);
                var access_token = resp.data;
                return getURI(access_token).then(function (res) {
                    return res;
                });
            }, function (err) {
                console.log(err);
            });
    }

}
angular
    .module('components')
    .service('GetSongName', GetSongName);