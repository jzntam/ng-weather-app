var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'pages/home.html',
    controller: 'homeController'
  })
  .when('/forecast', {
    templateUrl: 'pages/forecast.html',
    controller: 'forecastController'
  })
  .when('/forecast/:days', {
    templateUrl: 'pages/forecast.html',
    controller: 'forecastController'
  })
});

weatherApp.service('weatherService', function(){
  this.city = "New York, NY"
})

weatherApp.controller('homeController', ['$scope', 'weatherService', function ($scope, weatherService) {
  $scope.city = weatherService.city;
  $scope.$watch('city', function(){
    weatherService.city = $scope.city;
  });
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'weatherService', function ($scope, $resource, $routeParams, weatherService) {
  $scope.city = weatherService.city;
  $scope.days = $routeParams.days || '2';

  $scope.weatherAPI = $resource(
    "http://api.openweathermap.org/data/2.5/forecast/daily",
    {
      callback: "JSON_CALLBACK"
    },
    {
      get: { method: "JSONP" }
    }
  );

  $scope.weatherResult = $scope.weatherAPI.get(
    {
      q:     $scope.city,
      cnt:   $scope.days,
      appid: '92dee419b1737be748405422b0f195dd'
    }
  );

  $scope.convertToFahrenheit = function(degK) {
    return Math.round((1.8 * (degK - 273.15)) + 32);
  }

  $scope.convertToCelcius = function(degK) {
    return Math.round(degK - 273.15);
  }

  $scope.convertToDate = function(dt) {
    return new Date(dt * 1000);
  };

}]);

weatherApp.directive("weatherForecast", function(){
  return {
    restrict: 'E',
    templateUrl: 'directives/weather_forecast.html',
    replace: true,
    scope: {
      weatherData: '=',
      fahrenheitTemp: '&',
      celciusTemp: '&',
      convertToDate: '&',
      dateFormat: '@'
    }
  }
})
