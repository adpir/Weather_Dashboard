$(document).ready(function(){
    $("#submit").click(function(){
        let city =$("#city").val();
        if(city != '') {
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
             let widget=`<h1> ${data.name} </h1> <h2> Weather :${data.weather[0].description}</h2>
             <h2> Temp: ${data.main.temp}</h2>
             <h4>Wind speed: ${data.wind.speed}
             <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`
             $("#show").html(widget);
             $("#city").val('');
             
               } 
            });
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
          $("#uvi").append(`<h1> uviindex.. ${data.value}</h1>`)

        }       
})}



