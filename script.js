var previouscity = JSON.parse(localStorage.getItem("weatherlist"))|| []
$(document).ready(function(){
    $("#submit").click(function(){
        let city =$("#city").val();
        if(city != '') {
            Currentshow (city)
            FivedaysShow (city)
            console.log(city)
            previouscity.push(city)
            localStorage.setItem("weatherlist",JSON.stringify(previouscity))
            $(".list-group").prepend(`<li class="list-group-item">${city}</li>`)
        }else {
            $("#error").html('field cannot be empty');
        }
    });
});
function uvishow(lon,lat){
    $.ajax({
        url:"https://api.openweathermap.org/data/2.5/uvi?lat=" +lat + "&lon=" + lon + 
        "&APPID=b5ffc1b446f183868b291ba8f08a28ae",
        method:"GET",
        dataType:"json", 
        success: function(data){
          console.log(data);
          $("#uvi").append(`<h4 clas="bg-warning"> uviindex: ${data.value}</h4>`)

        }       
})}

function FivedaysShow(city){
    $.ajax({
        url:'https://api.openweathermap.org/data/2.5/forecast?q=' + city + "&units=imperial" + 
        "&APPID=b5ffc1b446f183868b291ba8f08a28ae",
        method:"GET",
        dataType:"json", 
        success: function(data){
          console.log(data);
        var data= data.list
        let widget =""
        for (let i=0; i< data.length; i=i +8) {
            widget+=`<div class="card bg-primary"<h1> ${data[i].dt_txt.split(" ")[0]} </h1> <h2> Weather :${data[i].weather[0].description}</h2>
            <h2> Temp: ${data[i].main.temp}</h2>
            <h4>Wind speed: ${data[i].wind.speed}
            <img src="https://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png"/></div>`
           

        }
        $(".Weather-list").html(widget)
       
         } 
      });
}
    function Currentshow(city){
        $.ajax({
            url:'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + 
            "&APPID=b5ffc1b446f183868b291ba8f08a28ae",
            method:"GET",
            dataType:"json", 
            success: function(data){
              console.log(data);
              var lat=data.coord.lat
              var lon=data.coord.lon
              uvishow(lon,lat)
           let widget=`<div class="bg-primary">
           <h1> ${data.name} </h1> <h2> Weather :${data.weather[0].description}</h2>
           <h2> Temp: ${data.main.temp}</h2>
           <h4>Wind speed: ${data.wind.speed}
           <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
           </div>`
           $("#show").html(widget);
           $("#city").val('');
           
             } 
          });

    }
