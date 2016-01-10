weatherApp.controller('homeController', ['$scope', '$location', 'weatherService', function ($scope, $location, weatherService) {
  $scope.city = weatherService.city;
  $scope.$watch('city', function(){
    weatherService.city = $scope.city;
  });

  $scope.submit = function(){
    $location.path('/forecast');
  };
}]);

weatherApp.controller('forecastController', ['$scope', '$routeParams', 'weatherService', 'weatherApiService', function ($scope,  $routeParams, weatherService, weatherApiService) {
  $scope.city = weatherService.city;
  $scope.days = $routeParams.days || '2';

  $scope.weatherResult = weatherApiService.GetWeather($scope.city, $scope.days)

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
