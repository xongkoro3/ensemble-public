/* Party Model */
angular.module('components.map-view')
    .config(['ParseProvider', function (ParseProvider) {
        var MY_PARSE_APP_ID = 'CaISb3EXwVEVKouyPkkRavAVyMZa0jX5NKfZtTVT';
        var MY_PARSE_JS_KEY = '5C4ukztPEsueltHOgGFZMAstODTqUGIAMxHWAIH5';
        ParseProvider.initialize(MY_PARSE_APP_ID, MY_PARSE_JS_KEY);
        ParseProvider.serverURL = 'https://parseapi.back4app.com';
    }]);

var PartyModel = function (Parse) {
    this.Parse = Parse;
    this.data = {};
    this.collection = [];
    this.name = 'Party';
    this.New = New;
    this.getById = getById;
    this.getByName = getByName;
    this.addParty = addParty;
    this.getAllParties = getAllParties;
    this.getPartyByRadius = getPartyByRadius;
    this.removeUserFromParty = removeUserFromParty;
    this.addUserToParty = addUserToParty;

    function New(obj) {
        if (angular.isUndefined(obj)) {
            const parseObject = new this.Parse.Object(this.name);
            return parseObject;
        } else {
            return obj;
        }
    }

    function getById(id) {
        return new this.Parse.Query(this.New()).get(id)
            .then(result => {
                this.Parse.defineAttributes(result, this.fields);
                this.data = result;
                return Promise.resolve(result);
            }).catch(error => Promise.reject(error));
    }

    function getByName(name) {
        return new this.Parse.Query(this.New())
            .equalTo('name', name)
            .first()
            .then(result => {
                this.Parse.defineAttributes(result, this.fields);
                this.data = result;
                // console.log('result', result)
                return result;
            })
    }

    function getAllParties() {
        return new this.Parse.Query(this.New())
            .find()
            .then(result => {
                this.data = result;
                // console.log(this.data);
                return this.data;
            })
    }

    /*
    	function getById(id) {
            return new this.Parse.Query(this.New()).get(id)
                .then(result => {
                    this.Parse.defineAttributes(result, this.fields);
                    this.data = result;
                    return Promise.resolve(result);
                }).catch(error => Promise.reject(error));
        }
    */

    function addParty(Party) {
        var newParty = this.New();
        console.log(Party);
        Object.keys(Party).forEach(function (key) {
            newParty.set(key, Party[key]);
            if (key == 'coords') {
                var point = {
                    latitude: parseFloat(Party[key]['lat']),
                    longitude: parseFloat(Party[key]['lng'])
                };
                newParty.set(key, point);
            }
        });

        newParty.save().then(
            (result) => {
                console.log('ParseObject created', result);
            },
            (error) => {
                console.error('Error while creating ParseObject: ', error);
            }
        );
    }

    function addUserToParty(id, username) {
        console.log('hello')
        return new this.Parse.Query(this.New()).get(id)
            .then(
                (result) => {
                    return result.addUnique("likes", username).save();
                },
                (error) => {
                    console.error('Error while creating ParseObject: ', error);
                }
            )
    }

    function removeUserFromParty(id, username) {
        return new this.Parse.Query(this.New()).get(id)
            .then(
                result => {
                    return result.remove("likes", username).save();
                },
                (error) => {
                    console.error('Error while creating ParseObject: ', error);
                }
            )
    }

    function getPartyByRadius(center, radius) {
        var userGeoPoint = new this.Parse.GeoPoint({
            latitude: center[0],
            longitude: center[1]
        });
        // console.log(typeof(userGeoPoint));
        return new this.Parse.Query(this.New())
            .near('coords', userGeoPoint)
            .find()
            .then(result => {
                this.data = result;
                // console.log(result);
                return result;
            })
    }
}
angular
    .module('root')
    .service('PartyModel', PartyModel);