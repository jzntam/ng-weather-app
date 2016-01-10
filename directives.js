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
