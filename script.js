let previouscity=JSON.parse(localStorage.getItem("#Weatherlist")) || []
$(document).ready(function(){
    $("#submit").click(function(){
        let city =$("#city").val();
        if(city != '') {
            console.log(city)
            // FiveDaysForecast()
             previouscity.push(city)
             localStorage.setItem("#Weatherlist",JSON.stringify(previouscity))
             $(".list-group").prepend(`<li class="list-group-item">${city}</li>`);
            $.ajax({
                url:'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + 
                "&APPID=b5ffc1b446f183868b291ba8f08a28ae",
                method:"GET",
                dataType:"json", 
                success: function(data){
                    console.log(data);
                    $.ajax({
                        url:'https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat +'&lon='+ data.coord.lon + '&appid=b5ffc1b446f183868b291ba8f08a28ae',
                        method:"GET",
                        dataType:"json", 
                        success:function(FiveDays){
                        let widget =show(data,FiveDays);
                        $("#show").html(widget);
                        $("#city").val('');



                        }
                //  let FiveDays=FiveDaysForecast(data);
                //  console.log(FiveDays);
                 
                  
        });        
      
    //  success: function(FiveDays){
    // //     return(FiveDays);

    //                 }       
                
        }});
                
           
            
            


function show(data, FiveDays){
    console.log(FiveDays);
    return "<h2>Name:" +data.name +"</h2>" +
    "<h2>Weather:" +data.weather[0].main +"</h2>"+
    "<h2>Description: "+data.weather[0].description +"</h2>"+
    "<h2>Temperature:" +data.main.temp +"</h2>" +
    "<h2>Humidity:" +data.main.humidity +"</h2>" +
    "<h2>Wind-Speed:" +data.wind.speed +"</h2>"+
    "<h2>uvi-index:" +FiveDays.current.uvi +"</h2>"+
    "<h2>lon:" +data.coord.lon +"</h2>"

}
  




//  function FiveDaysForecast(data){
//     //  $.ajax({
//     // url:'https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat +'&lon='+ data.coord.lon + '&appid=b5ffc1b446f183868b291ba8f08a28ae',
//     // method:"GET",
//     // dataType:"json", 
//     // success: function(FiveDays){
//     //     return(FiveDays);
        
        
//         // let Weatherlist =show(data,FiveDays);
       
// //         for ( let i=0; i< data.length;i=i +8){
// //       let data= data[i];
// //       let data=data.coord.lat
// //       let data= data.coord.lon
// //  }

        

//       }}
    

}});

});
   
     
