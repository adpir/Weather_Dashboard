let city = "";
$(document).ready(function () {
  let previouscity = JSON.parse(localStorage.getItem("#Weatherlist")) || [];
  let place =
    '<input type="text" value=" ' +
    previouscity[0] +
    '" name="city" id="city" class="form-control">';
  Citylist(previouscity);
  $("#city").replaceWith(place);
  $("#submit").click(function () {
    city = $("#city").val();
    if (city != "") {
      console.log(city);
      Weather(city);
      previouscity.push(city);
      console.log(previouscity);
      localStorage.setItem("#Weatherlist", JSON.stringify(previouscity));
    } else {
      $(".msg").html("Error-Please enter a City");
    }
  });

  function Weather(city) {
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial" +
        "&APPID=b5ffc1b446f183868b291ba8f08a28ae",
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data);
        let widget = show(data);
        $("#show").html(widget);
        $("#city").val("");
        $("#show").append(
          "<img src='http://openweathermap.org/img/w/" +
            data.weather[0].icon +
            ".png' alt='Icon depicting current weather.'>"
        );
        FiveDaysForecast(data.coord.lat, data.coord.lon);
        uvishow(data.coord.lat, data.coord.lon);
      },
    });
  }
  function Citylist(CityNames) {
    for (i = 0; i < CityNames.length; i++) {
      let history =
        '<li class="list-group-item" onclick="Weather(' +
        CityNames[i] +
        ')"> ' +
        CityNames[i] +
        "</li>";
      $(".list-group").prepend(history);
    }
  }

  $(".list-group").on("click", "li", function () {
    $("#uvi").empty();
    city = $(this).text();
    Weather(city);
    FiveDaysForecast();
  });

  function KevinToFarhenheit(tempInKevin) {
    return (tempInKevin - 273.15) * 1.8 + 32;
  }

  function FiveDaysForecast(lat, lon) {
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=b5ffc1b446f183868b291ba8f08a28ae",
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.info("Weather API", data);
        $("#forecast").empty();
        let forecastPlaceholder = $("#forecast"); // pointer to that div

        // add a row div to the forecast div
        let forecastRowDiv = $('<div class="row"></div>');
        forecastPlaceholder.append(forecastRowDiv);

        for (i = 0; i < 5; i++) {
          let styledDiv = $(
            '<div class="col-sm-2" style="background-color:lightblue"></div>'
          );
          let IconWebsite = $("<img>").attr(
            "src",
            "https://openweathermap.org/img/w/" +
              data.daily[i].weather[0].icon +
              ".png"
          );
          let Date = data.daily[i].dt;
          let dates = moment.unix(Date).format("LL");

          styledDiv.append(
            "Temp:" +
              Math.floor(KevinToFarhenheit(data.daily[i].temp.day)) +
              "&deg;F" +
              "</p>"
          );
          styledDiv.append("Humidity:" + data.daily[i].humidity + "</p>");
          styledDiv.append(dates);
          styledDiv.append(IconWebsite);
          forecastRowDiv.append(styledDiv);
        }
      },
    });
  }

  function uvishow(lat, lon) {
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&APPID=b5ffc1b446f183868b291ba8f08a28ae",
      method: "GET",
      dataType: "json",
      success: function (data2) {
        console.log(data2);
        $("#uvi").append(
          `<h4 clas="bg-warning"> uviindex: ${data2.value}</h4>`
        );
      },
    });
  }

  function show(data) {
    console.log(data);
    return (
      "<h2>Name:" +
      data.name +
      "</h2>" +
      "<h2>Weather:" +
      data.weather[0].main +
      "</h2>" +
      "<h2>Description: " +
      data.weather[0].description +
      "</h2>" +
      "<h2>Temperature:" +
      data.main.temp +
      "</h2>" +
      "<h2>Humidity:" +
      data.main.humidity +
      "</h2>" +
      "<h2>Wind-Speed:" +
      data.wind.speed +
      "</h2>"
    );
  }
});
