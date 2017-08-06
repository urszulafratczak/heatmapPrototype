"use strict";
/// <reference path="./../../../typings/angularjs/angular.d.ts" />
/// <reference path="./../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="./../../../typings/heatmapjs/heatmap.d.ts" />
/// <reference path="./../../../typings/heatmapjs/leaflet.d.ts" />
//exports.__esModule = true;
//require("./../app"); //import module from app.ts
var mainCtrl = (function () {
    function mainCtrl($scope, $http) {
        var _this = this;
        this.$scope = $scope;
        this.$http = $http;
        this.$inject = ['$scope', '$http'];
        var baseLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18
        });
        var cfg = {
            // radius should be small ONLY if scaleRadius is true (or small radius is intended)
            // if scaleRadius is false it will be the constant radius used in pixels
            "radius": 2,
            "maxOpacity": .8,
            // scales the radius based on map zoom
            "scaleRadius": true,
            // if set to false the heatmap uses the global maximum for colorization
            // if activated: uses the data maximum within the current map boundaries
            //   (there will always be a red spot with useLocalExtremas true)
            "useLocalExtrema": true,
            // which field name in your data represents the latitude - default "lat"
            latField: 'lat',
            // which field name in your data represents the longitude - default "lng"
            lngField: 'lng',
            // which field name in your data represents the data value - default "value"
            valueField: 'count'
        };
        var heatmapLayer = new HeatmapOverlay(cfg);
        var map = new L.Map('mapid', {
            center: new L.LatLng(25.6586, -80.3568),
            zoom: 4,
            layers: [baseLayer, heatmapLayer]
        });
        this.loadMapData().then(function (response) {
            _this.$scope.data = response;
            var dataToDisplay;
            dataToDisplay = {
                max: 12,
                data: _this.$scope.data
            };
            heatmapLayer.setData(dataToDisplay);
        });
    }
    mainCtrl.prototype.loadMapData = function () {
        return this.$http.get("/heatmap/data").then(function (response) {
            console.log(response.data);
            return response.data;
        });
    };
    return mainCtrl;
}());
app.controller('mainCtrl', mainCtrl);
