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

weatherApp.controller('forecastController', ['$scope', '$resource', 'weatherService', function ($scope, $resource, weatherService) {
  $scope.city = weatherService.city;

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
      cnt:   2,
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
