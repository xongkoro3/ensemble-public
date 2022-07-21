/**
 *
 * @ngdoc module
 * @name common
 *
 * @requires ui.router
 *
 * @description
 *
 *
 **/
angular
    .module('common', ['ngParse', 'ngRoute', 'ngMaterial', 'mapboxgl-directive', 'ui.router'])
    .config(function($locationProvider, $mdThemingProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');
        $mdThemingProvider.definePalette('enindigo', {
            '50': 'e8e6e9',
            '100': 'c5c0c8',
            '200': '9e96a4',
            '300': '776c80',
            '400': '594d64',
            '500': '3c2d49',
            '600': '362842',
            '700': '2e2239',
            '800': '271c31',
            '900': '190829',
            'A100': 'b763ff',
            'A200': 'a030ff',
            'A400': '8800fc',
            'A700': '7a00e3',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                'A100'
            ],
            'contrastLightColors': [
                '300',
                '400',
                '500',
                '600',
                '700',
                '800',
                '900',
                'A200',
                'A400',
                'A700'
            ]
        });
        $mdThemingProvider.definePalette('enorange', {
            '50': 'fff6e8',
            '100': 'ffe7c7',
            '200': 'ffd8a1',
            '300': 'ffc87b',
            '400': 'ffbc5f',
            '500': 'ffb043',
            '600': 'ffa93d',
            '700': 'ffa034',
            '800': 'ff972c',
            '900': 'ff871e',
            'A100': 'ffffff',
            'A200': 'ffffff',
            'A400': 'ffe3ce',
            'A700': 'ffd5b4',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                '300',
                '400',
                '500',
                '600',
                '700',
                '800',
                '900',
                'A100',
                'A200',
                'A400',
                'A700'
            ],
            'contrastLightColors': []
        });
        $mdThemingProvider.definePalette('enyellow', {
            '50': 'fffae8',
            '100': 'fff3c5',
            '200': 'ffec9e',
            '300': 'ffe477',
            '400': 'ffde5a',
            '500': 'ffd83d',
            '600': 'ffd437',
            '700': 'ffce2f',
            '800': 'ffc827',
            '900': 'ffbf1a',
            'A100': 'ffffff',
            'A200': 'fffffe',
            'A400': 'ffefcb',
            'A700': 'ffe8b2',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                '300',
                '400',
                '500',
                '600',
                '700',
                '800',
                '900',
                'A100',
                'A200',
                'A400',
                'A700'
            ],
            'contrastLightColors': []
        });
        $mdThemingProvider.definePalette('enpink', {
            '50': 'ffecf1',
            '100': 'ffcfdd',
            '200': 'ffafc6',
            '300': 'ff8eaf',
            '400': 'ff769d',
            '500': 'ff5e8c',
            '600': 'ff5684',
            '700': 'ff4c79',
            '800': 'ff426f',
            '900': 'ff315c',
            'A100': 'ffffff',
            'A200': 'ffffff',
            'A400': 'ffdce3',
            'A700': 'ffc3ce',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                '300',
                '400',
                '500',
                '600',
                '700',
                'A100',
                'A200',
                'A400',
                'A700'
            ],
            'contrastLightColors': [
                '800',
                '900'
            ]
        });
        $mdThemingProvider.theme('default')
            .primaryPalette('enindigo', {
                'default': '300',
                'hue-1': '900',
                'hue-2': '700',
                'hue-3': '500'
            })
            .accentPalette('enpink', {
                'default': '700',
                'hue-1': '800',
                'hue-2': '500',
                'hue-3': '400'
            });
    })
    .run(function() {
        mapboxgl.accessToken = 'pk.eyJ1IjoidmlpY2UiLCJhIjoiY2pzNTN3eHU5MGJvdjN6b3pma29mYjZpcyJ9.UGzqD9Wsl3f_OGz1F7PNeA';
    })
    .filter('trusted', ['$sce', function($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);
