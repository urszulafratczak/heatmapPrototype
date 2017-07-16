var app = angular.module('myApp', []);

app.controller('mainCtrl', function($scope, $http) {
    console.log("Hello world from controller");

    var testData = {
      max: 12,
      data: [
        {lat: 24.6408, lng:46.7728, count: 3},
        {lat: 41.75, lng:12.55, count: 1},
        {lat: 52.75, lng:21.55, count: 5}
      ]
    };

    var baseLayer = L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
      }
    );

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

    heatmapLayer.setData(testData);



    $scope.refresh = function() {
      $http.get("/data").then(function(response) {
        console.log("I got data from server");
        $scope.data = response.data;
      });
    };

    $scope.refresh();

});
