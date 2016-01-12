weatherApp.service('weatherService', function(){
  this.city = "Vancouver, BC"
})

weatherApp.service('weatherApiService', ['$resource', function($resource){
  this.GetWeather =  function(city, days){
    var weatherAPI = $resource(
      "http://api.openweathermap.org/data/2.5/forecast/daily",
      {
        callback: "JSON_CALLBACK"
      },
      {
        get: { method: "JSONP" }
      }
    );

    return weatherAPI.get({q: city, cnt: days, appid: '92dee419b1737be748405422b0f195dd'});
  }
}])
