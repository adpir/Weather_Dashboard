$(document).ready(function(){
    $(".submit").click(function(){
        let city =$("#city").val();
        if(city != ' ') {
            $.ajax({
              url:"https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=b5ffc1b446f183868b291ba8f08a28ae",
              method:"GET",
              datamethod:"jsonp", 
               success: function(data){
            
               } 
            });
        }else {
            $("#error").html("field cannot be empty");
        }
    });
});
function show(data){
    return"<h2>Weather: "+ data.weather[0].main + "<h2>" +
   
};