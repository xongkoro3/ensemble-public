function mapController(PartyModel, Dialog) {
    let $ctrl = this;

    loadAllPartyFromParse();

    // populates map with all parties from Parse DB
    function loadAllPartyFromParse() {
        PartyModel.getAllParties().then(function (results) {
            console.log('Coords type: ' + results);
            drawMarkers(results);
        });
    }

    // updates map with parties within certain radius
    function updatePartyByRadius(center, radius) {
        $ctrl.glMarkers = [];
        PartyModel.getPartyByRadius(center, radius).then(function (results) {
            drawMarkers(results);
        });
    }

    // Creates parties on map
    function drawMarkers(results) {
        $ctrl.parties = results;
        $ctrl.glMarkers = []
        results.forEach(function (res) {
            console.log(res);
            $ctrl.glMarkers.push({
                coordinates: [res.attributes.coords.longitude, res.attributes.coords.latitude],
                element: createElement({
                    width: 35,
                    height: 35
                }, res),
                options: {
                    offset: [0, 0]
                },
                popup: {
                    enabled: true,
                    message: '<a href="details/' + res.id + '">' + res.attributes.name + '</a>',
                    options: {
                        offset: 20
                    }
                }
            });
        });
    }

    // creates an event icon
    function createElement(iconSize, event) {
        var element = document.createElement('div');
        if (event.attributes.image) {
            var image = document.createElement('img');
            image.src = event.attributes.image;
            image.style.width = iconSize.width + 'px';
            image.style.height = iconSize.height + 'px';
            image.style.borderRadius = '50%';
            image.style.border = '2px solid black';
            element.appendChild(image)

            element.style.borderRadius = '50%';
            element.style.border = '2px solid white';
            element.style.outlineRadius = '50%';
        } else {
            element.className = 'marker';
        }
        return element;
    }

    // Creates map controls
    $ctrl.glControls = {
        navigation: {
            enabled: true,
            options: {
                position: 'top-right'
            }
        },
        geolocate: {
            enabled: true,
            options: {
                position: 'top-left'
            }
        }
    };

    $ctrl.showDialog = function (ev) {
        Dialog.showDialog(ev);
    };

}


angular
    .module('components.map-view')
    .controller('mapController', mapController);