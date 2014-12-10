$.simpleWeather({
    location: 'Austin, TX',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});

var icons = { 
      "clear-day" : "B", 
      "clear-night" : "C", 
      "rain" : "R", 
      "snow" : "G", 
      "sleet" : "X", 
      "wind" : "S", 
      "fog" :"N", 
      "cloudy" : "Y",
      "partly-cloudy-day" : "H", 
      "partly-cloudy-night" : "I"
    };
 
    // Cities
    var cities = {
      "Seattle" : {coords: {latitude: 47.6097, longitude:122.3331}},
      "Spokane" : {coords: {latitude: 47.6589, longitude: 117.4250 }},
      "Cheney" : {coords: {latitude:47.4886, longitude: 117.5786}},
      
      };


      // Get Weather  
    function loadWeather(cityCoords){
      
      console.log(cityCoords);
 
      var latlng = cityCoords.coords.latitude + "," + cityCoords.coords.longitude;
              
      var forecastURL = "https://api.forecast.io/forecast/e79ce4f49850f7741774f156ee9198bc/" + latlng;
 
      $.ajax({
          url: forecastURL,
          jsonpCallback: 'jsonCallback',
          contentType: "application/json",
          dataType: 'jsonp',
          success: function(json) {
 
            // Returned Data 
            console.log(json);
 
            // Display Data Dynamically
            $("#current_temp").html(Math.round(json.currently.temperature)+"&#176;F");
            $("#current_summary").html(json.currently.summary);
            $("#current_temp").attr("data-icon",icons[json.currently.icon]);
 
          },
          error: function(e) {
             console.log(e.message);
          }
      });
 
    }
    
    function loadCity(city){
      $("#location").html(city);

      if (city.toLowerCase() == "current location") {
        if ( navigator.geolocation )
          navigator.geolocation.getCurrentPosition(loadWeather,loadDefaultCity);
        else {
          loadDefaultCity();
        }

      } else {
        loadWeather(cities[city.toLowerCase()]);
      }

    }

    function loadDefaultCity(){
      loadCity("Cheney");
    }
    
 
    // On Page Load
    $(document).ready(function(){
 
      // Load City, then load weather
      loadCity("Cheney");
 
      // Bind click to City
 
      $(".item").bind("click",function(){
        loadCity($(this).html());
      });
 
    });