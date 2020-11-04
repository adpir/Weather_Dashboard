$(document).ready(function(){
    $("#submit").click(function(){
        let city =$("#city").val();
        if(city != '') {
            $.ajax({
              url:'http://api.openweathermap.org/data/2.5/weather?q=' + city + name + "&units=metric" + 
              "&APPID=b5ffc1b446f183868b291ba8f08a28ae",
              type:"GET",
              dataType:"jsonp", 
              success: function(data){
             let widget=show(data);
             $("#show").html(widget);
             $("#city").val('');
             
               } 
            });
        }else {
            $("#error").html('field cannot be empty');
        }
    });
});
function show(data){
    return "<h2> Weather : "+ data.weather[0].main +"</h2>"
}           "<h2> Weather : "+ data.weather[0].description +"</h2>"





