let previouscity = JSON.parse(localStorage.getItem("#Weatherlist"))|| []
$(document).ready(function(){
    $("#submit").click(function(){
        let city =$("#city").val();
        if(city != '') {
            console.log(city)
            Weather(city)
            
             previouscity.push(city)
             localStorage.setItem("#Weatherlist".JSON.stringify(previouscity));
             $(".list-group").prepend(`<li class="list-group-item">${city}</li>`);
             //History item saved//
            //  $(".list-group-item").on("click",function(){
            //     console.log()
            //  })
        }else {
            $(".msg").html('Error-Please enter a City');
        }
    });
         function Weather(city){
            $.ajax({
                url:'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" +
                "&APPID=b5ffc1b446f183868b291ba8f08a28ae",
                method:"GET",
                dataType:"json",
                success: function(data){
                    console.log(data);
                    // let FiveDays=FiveDaysForecast(data);
                    let widget =show(data);
                     $("#show").html(widget);
                     $("#city").val('');
                     $("#icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
                     uvishow(data.coord.lat,data.coord.lon);
                     FiveDaysForecast(data.coord.lat,data.coord.lon);
                    //  let iconcode =data.weather[0].icon
                    //  let iconURL= "https://openweathermap.org/img/w" + iconcode + ".png";
                    //  $("#icon").innerHtml("src'",iconURL + "'/>");



    }});





 
        //                 // }
        //         //  let FiveDays=FiveDaysForecast(data);
        //         //  console.log(FiveDays);


        // }});
        // "<h2>uvi-index:" +FiveDays.current.uvi +"</h2>"

       

         }

         function KevinToFarhenheit(tempInKevin) {
             return ((tempInKevin-273.15)*1.8)+32
         }
       
         function FiveDaysForecast(lat,lon){
            $.ajax({
        url:'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +'&lon='+ lon + '&appid=b5ffc1b446f183868b291ba8f08a28ae',

            method:"GET",
            dataType:"json",
            success:function(data){
            console.info("Weather API", data);
            // for (let i=0; i< 5; i=i +8) 
           
            $("#temp").html("Temp: "+data.daily[1].temp.day);
            $("#date").html(moment(data.daily[1].dt).format("MMM Do YY"));
            $("#humidity").html("Humidity:"+data.daily[1].humidity);
            $("#temp2").html("Temp: " + KevinToFarhenheit(data.daily[1].temp.day));
            $("#date2").html(data.list[0].dt_txt);
            $("#humidity2").html("Humidity:"+data.list[0].main.humidity);
            $("#temp3").html("Temp: "+data.daily[2].temp.day);
            $("#date3").html(data.list[0].dt_txt);
            $("#humidity3").html("Humidity:"+data.list[0].main.humidity);
            $("#temp4").html("Temp: "+data.daily[3].temp.day);
            $("#date4").html(data.list[0].dt_txt);
            $("#humidity4").html("Humidity:"+data.list[0].main.humidity);

            $("#forecast").text("forecast");
            // for (let i=0; i< data.length; i=i +8) {
            //     let FiveDays=show(data);
            //     $("#show").html(FiveDays);
                  
              
                   
            

           
            // // // // //     <img src="https://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png"/></div>`

            // // }

         }});   // //  $("#weatherInfo").html(container2)
            // }
            // moment(data.daily[1].dt).format('YYYY-MM-DD')
        }    
        
        function uvishow(lat,lon){
            $.ajax({
                url:"https://api.openweathermap.org/data/2.5/uvi?lat=" +lat + "&lon=" + lon + 
                "&APPID=b5ffc1b446f183868b291ba8f08a28ae",
                method:"GET",
                dataType:"json", 
                success: function(data2){
                  console.log(data2);
                   $("#uvi").append(`<h4 clas="bg-warning"> uviindex: ${data2.value}</h4>`)
        
                }       
        })}
    //      function GenerateForecast(data){
    //          let html =`
    //           <h3 class="temp">${data.main.temp}</h3>
    //         <h3 class="status">${data.main.list.map(item =>item).join
    //     ('')}</h3>
    // //   <div id="weatherInfo">
    // //   <div class="info-icon"></div>
    // //    <p>Date</p>
    // //    <p>Temp</p>
    // //    <p>Huminity</p>
    // //    <div id="icon2"></div>
    // //     </div>
    // //     `; 
      
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








function show(data){
    console.log(data);
     return "<h2>Name:" +data.name +"</h2>"+
    "<h2>Weather:" +data.weather[0].main +"</h2>"+
    "<h2>Description: "+data.weather[0].description +"</h2>"+
    "<h2>Temperature:" +data.main.temp +"</h2>" +
    "<h2>Humidity:" +data.main.humidity +"</h2>" +
    "<h2>Wind-Speed:" +data.wind.speed +"</h2>"
  







 }





//   function forecastshow(data){
//       console.log(data)
//       return "<h2>Name:" +data.temp +"</h2>" +
//       "<h2>Weather:" +data.weather[0].main +"</h2>"+
//       "<h2>Description: "+data.sys +"</h2>"+
//       "<h2>Temperature:" +data.humidity+"</h2>" +
//       "<h2>Humidity:" +data.dt +"</h2>"



//   }


//       function FiveDaysForecast (data){
//           $.ajax({
//          url:'https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat +'&lon='+ data.coord.lon + '&appid=b5ffc1b446f183868b291ba8f08a28ae',
//          method:"GET",
//          dataType:"json",
//          success: function(FiveDays){
//          return FiveDays;

//       }


// //         // let Weatherlist =show(data,FiveDays);

// // //         for ( let i=0; i< data.length;i=i +8){
// // //       let data= data[i];
// // //       let data=data.coord.lat
// // //       let data= data.coord.lon
// // //



// //       }}


//       });

});


