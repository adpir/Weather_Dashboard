function Citylist(CityNames){
    console.log(CityNames)
    $(".list-group").prepend(`<li class="list-group-item">${CityNames[0]}</li>`);
    $(".list-group").prepend(`<li class="list-group-item">${CityNames[1]}</li>`);
    $(".list-group").prepend(`<li class="list-group-item">${CityNames[2]}</li>`);
            //History item saved//
             // $(".list-group-item").on("click",function(){
            //     console.log()
            //  })
}
let previouscity = JSON.parse(localStorage.getItem("#Weatherlist")) || []
let place = '<input type="text" value=" ' + previouscity[0] + '" name="city" id="city" class="form-control">'
 Citylist(previouscity);
$("#city").replaceWith(place);
$(document).ready(function() {
    $("#submit").click(function() {
        let city = $("#city").val();
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

    
        
    


    function Weather(city) {
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" +
                "&APPID=b5ffc1b446f183868b291ba8f08a28ae",
            method: "GET",
            dataType: "json",
            success: function(data) {
                console.log(data);
                // let FiveDays=FiveDaysForecast(data);
                let widget = show(data);
                $("#show").html(widget);
                $("#city").val('');
                $("#icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
                uvishow(data.coord.lat, data.coord.lon);
                FiveDaysForecast(data.coord.lat, data.coord.lon);
                //  let iconcode =data.weather[0].icon
                //  let iconURL= "https://openweathermap.org/img/w" + iconcode + ".png";
                //  $("#icon").innerHtml("src'",iconURL + "'/>")

            }
        });

        //                 // }
        //         //  let FiveDays=FiveDaysForecast(data);
        //         //  console.log(FiveDays);


        // }});
        // "<h2>uvi-index:" +FiveDays.current.uvi +"</h2>"

    }

    function KevinToFarhenheit(tempInKevin) {
        return ((tempInKevin - 273.15) * 1.8) + 32
    }

    function FiveDaysForecast(lat, lon) {
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=b5ffc1b446f183868b291ba8f08a28ae',
            method: "GET",
            dataType: "json",
            success: function(data) {
                console.info("Weather API", data);

                var forecastPlaceholder = $("#forecast") // pointer to that div
                
                // add a row div to the forecast div
                var forecastRowDiv = $('<div class="row"></div>')
                forecastPlaceholder.append(forecastRowDiv)
               
              
                for (i = 0; i < 5; i++) {
                    // create a styled div so CSS works
                    var styledDiv = $('<div class="col-sm-2" style="background-color:lightblue"></div>')

                    // add data from the API to styled div
                    // styledDiv.append("Temp:" + KevinToFarhenheit(data.daily[i].temp.day + "</p>"))
                   
                    styledDiv.append("Temp:" +  KevinToFarhenheit(data.daily[i].temp.day) + "</p>")
                    styledDiv.append("Humidity:" + data.daily[i].humidity + "</p>")
                    

                    // in the end put the styled div in the main row div
                    forecastRowDiv.append(styledDiv)
                }
 
                // $("#date").html(moment(data.daily[1].dt).format("MMM Do YY"));
            

                // // // // //     <img src="https://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png"/></div>`

                // // }

            }
        }); 
        // }
        // moment(data.daily[1].dt).format('YYYY-MM-DD')
    }

    function uvishow(lat, lon) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon +
                "&APPID=b5ffc1b446f183868b291ba8f08a28ae",
            method: "GET",
            dataType: "json",
            success: function(data2) {
                console.log(data2);
                $("#uvi").append(`<h4 clas="bg-warning"> uviindex: ${data2.value}</h4>`)

            }
        })
    }
     

    //         }
    //    $(".weatherInfo").html()
    //     }
    //     $.ajax({
    //         url:'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" +
    //         "&APPID=b5ffc1b446f183868b291ba8f08a28ae",
    //         method:"GET",
    //         dataType:"json",
    //         success: function(data){
    //             console.log(data);
    //             // let FiveDays=FiveDaysForecast(data);
    //              let widget =show(data);
    //              $("#show").html(widget);
    //              $("#city").val('');
    //              $("#icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");


    //



    // function uvishow(lon,lat){
    //     $.ajax({
    //         url:"https://api.openweathermap.org/data/2.5/uvi?lat=" +lat + "&lon=" + lon +
    //         "&APPID=b5ffc1b446f183868b291ba8f08a28ae",
    //         method:"GET",
    //         dataType:"json",
    //         success: function(data){
    //           console.log(data);
    //           $("#uvi").append(`<h4 clas="bg-warning"> uviindex: ${data.value}</h4>`)

    //         }
    // })}




    // //                 // }
    // //         //  let FiveDays=FiveDaysForecast(data);
    // //








    function show(data) {
        console.log(data);
        return "<h2>Name:" + data.name + "</h2>" +
            "<h2>Weather:" + data.weather[0].main + "</h2>" +
            "<h2>Description: " + data.weather[0].description + "</h2>" +
            "<h2>Temperature:" + data.main.temp + "</h2>" +
            "<h2>Humidity:" + data.main.humidity + "</h2>" +
            "<h2>Wind-Speed:" + data.wind.speed + "</h2>"








    }



    
});