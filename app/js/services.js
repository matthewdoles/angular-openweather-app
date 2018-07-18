'use strict';

/* Services */

angular.module('openWeatherApp.services', ['ngResource'])

  //
  // Simple value service (kept from angular-seed dist)
  //
  .value('version', '0.1.6')


  //
  // Define a standard list of "example locations"
  //
  .value('exampleLocations',['Tampa','Chicago','London','Seattle','New York','Tokyo','Berlin','Reykjavik'])
  //
  // Storm "Xaver" special locations
  //
  .value('stormLocations',['Sylt','St. Peter-Ording','Husum','Bremerhaven','Hamburg','Kiel','Lübeck'])


  //
  // Register service for openweathermap.com
  //
  // - Inject $resource from angular-resource context
  // - Generate custom resource object able to query open weather map api with custom parameters
  // -
  // - Tricky: Avoid needing a server/proxy by forcing a JSONP request: Angular handles callback
  //   if JSON_CALLBACK is set as function name parameter in which response should be wrapped
  //   (subject to be made configurable through service initialization so that server mode using
  //    "normal" json api is supported as well)
  //
  .factory('openWeatherMap', function($resource) {

    // API key is currently unused (work either with or without key)
    var apiKey = '279b4be6d54c8bf6ea9b12275a567156';
    var apiBaseUrl = 'http://api.openweathermap.org/data/2.5/';

    return $resource(apiBaseUrl + ':path/:subPath?:filter=:location&cnt=:cnt',
      {
        APPID: apiKey,
        mode: 'json',
        callback: 'JSON_CALLBACK',
        units: 'imperial',
        lang: 'en'
      },
      {
        queryWeather: {
          method: 'JSONP',
          params: {
            path: 'weather',
            filter: 'q'
          },
          isArray: false,
          headers: {
            'x-api-key': apiKey
          }
        },
        queryForecast: {
          method: 'JSONP',
          params: {
            path: 'forecast',
            filter: 'q'
          },
          isArray: false,
          headers: {
            'x-api-key': apiKey
          }
        },
        queryForecastDaily: {
          method: 'JSONP',
          params: {
            path: 'forecast',
            subPath: 'daily',
            filter: 'q'
          },
          isArray: false,
          headers: {
            'x-api-key': apiKey
          }
        },
        queryForecastZip: {
          method: 'JSONP',
          params: {
            path: 'forecast',
            subPath: 'daily',
            filter: 'zip'
          },
          isArray: false,
          headers: {
            'x-api-key': apiKey
          }
        }
      }
    )
  });
