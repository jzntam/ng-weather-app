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

weatherApp.controller('forecastController', ['$scope', 'weatherService', function ($scope, weatherService) {
  $scope.city = weatherService.city;
}]);
