var Radius = function($rootScope) {
    this.data = '';
    this.center = '';

    this.sendData = function(data) {
        this.data = data;
        $rootScope.$broadcast('radius_updated');
    }
    this.getData = function() {
        return this.data
    }
}
