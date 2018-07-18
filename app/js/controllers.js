'use strict';

/* Controllers */

angular.module('openWeatherApp.controllers', [])

  // Controller for "open weather map" api data search
  .controller('OpenWeatherCtrl',
    ['$scope','openWeatherMap','exampleLocations','stormLocations','ISO3166',
      function($scope,openWeatherMap,exampleLocations,stormLocations,ISO3166) {

    $scope.message = '';

    // Expose example locations to $scope
    $scope.exampleLocations = exampleLocations;
    $scope.stormLocations = stormLocations;
    $scope.iconBaseUrl = 'https://openweathermap.org/img/w/';

    // On initialization load data for first example entry
    $scope.forecast = openWeatherMap.queryForecastDaily({
      location: exampleLocations[ 0 ],
      cnt: 7 
    });

    // Get forecast data for location as given in $scope.location
    $scope.getForecastByLocation = function() {

      if ($scope.location == '' || $scope.location == undefined) {
        $scope.message = 'Please provide a location';
        return;
      }

      if (isNaN($scope.location))
      {
        $scope.forecast = openWeatherMap.queryForecastDaily({
          location: $scope.location,
          cnt: $scope.count //defaults to 7 if not specified
        });
      }
      else 
      {
        $scope.forecast = openWeatherMap.queryForecastZip({
          location: $scope.location + ',us', //default to United States
          cnt: $scope.count //defaults to 7 if not specified
        });
      }
      
    };

    // Set $scope.location and execute search on API
    $scope.setLocation = function(loc) {
      $scope.location = loc;
      $scope.count = 7;
      $scope.getForecastByLocation();
    };

    // Get icon image url
    $scope.getIconImageUrl = function(iconName) {
      return (iconName ? $scope.iconBaseUrl + iconName + '.png' : '');
    };

  }])
