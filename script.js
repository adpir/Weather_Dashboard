 let city ="";

$(document).ready(function() {
    let previouscity = JSON.parse(localStorage.getItem("#Weatherlist")) || []
    let place = '<input type="text" value=" ' + previouscity[0] + '" name="city" id="city" class="form-control">'
     Citylist(previouscity);
    $("#city").replaceWith(place);
    $("#submit").click(function() {
         city = $("#city").val();
        if (city != '') {
            console.log(city)
           Weather(city)
           previouscity.push(city)
           console.log(previouscity)
            localStorage.setItem("#Weatherlist", JSON.stringify(previouscity));


        } else {
            $(".msg").html('Error-Please enter a City');
        }
    });


 // Performing an AJAX request with the queryURL
    function Weather(city) {
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" +
                "&APPID=b5ffc1b446f183868b291ba8f08a28ae",
            method: "GET",
            dataType: "json",
            success: function(data) {
                console.log(data);
                let widget = show(data);
                $("#show").html(widget);
                $("#city").val('');


                FiveDaysForecast(data.coord.lat, data.coord.lon);
                uvishow(data.coord.lat, data.coord.lon);

            }
        });


    }
    function Citylist(CityNames){
        for (i = 0; i < CityNames.length; i++) {
            let history= '<li class="list-group-item" (' + CityNames[i] + ')"> ' + CityNames[i] + '</li>';
            $(".list-group").prepend(history);



        }

    }

     $(".list-group").on("click","li",function() {
         $("#uvi").empty();
         city =$(this).text();
         Weather(city);
         FiveDaysForecast();
     })

    function KevinToFarhenheit(tempInKevin) {
        return ((tempInKevin - 273.15) * 1.8) + 32




    }
 // Performing an AJAX request with the queryURL
    function FiveDaysForecast(lat, lon) {
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=b5ffc1b446f183868b291ba8f08a28ae',
            method: "GET",
            dataType: "json",
            success: function(data) {
                console.info("Weather API", data);
                $("#forecast").empty();
                let forecastPlaceholder = $("#forecast") // pointer to that div

                // add a row div to the forecast div
                let forecastRowDiv = $('<div class="row"></div>');
                forecastPlaceholder.append(forecastRowDiv);

             //Create a for loop
                for (i = 0; i < 5; i++) {
                    let styledDiv = $('<div class="col-sm-2" </div>');
                    let IconWebsite = $("<img>").attr("src","https://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png");
                    let Date =data.daily[i].dt;
                    let dates = moment.unix(Date).format('LL');

                    styledDiv.append("Temp: " + Math.floor(KevinToFarhenheit(data.daily[i].temp.day)) +"&deg;F" + "</p>");
                    styledDiv.append("Humidity:" + data.daily[i].humidity + "</p>");
                    styledDiv.append(IconWebsite);
                    styledDiv.append(dates);
                    forecastRowDiv.append(styledDiv);

                }


            }
        });

    }

    function uvishow(lat, lon) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon +
                "&APPID=b5ffc1b446f183868b291ba8f08a28ae",
            method: "GET",
            dataType: "json",
            success: function(uIndex) {
                console.log(uIndex);
                $("#uvi").append(`<h3 clas="bg-warning"> UV Index: ${uIndex.value}</h3>`)
            }
        })
    }



    function show(data) {
        console.log(data);
        return "<h3>" + data.name + "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='current weather icon.'>"+"</h3>"+
            "<h3>Temperature:" + data.main.temp  +"&deg;F </h3>" +
            "<h3>Humidity:" + data.main.humidity + "% </h3>" +
            "<h3>Wind-Speed:" + data.wind.speed + " MPH </h3>"
            

    }




});