window.onload = function(){

    var latitude, longitude;

    function grabLocation () {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(locationData);
        } else {
            // "Geolocation Data not supported by this browswer"
        }
    }

    function locationData(position){
        console.log(position);
        latitude = parseFloat(position.coords.latitude);
        longitude = parseFloat(position.coords.longitude);
        console.log(latitude +" " + longitude)
        $.ajax({
            type: "GET",
            url: "https://fcc-weather-api.glitch.me/api/current?lat="+latitude+"&lon="+longitude+""
        }).done(function(response){
            console.log(response);
            $("#city").text(response.name);
            $("#weather").text(response.weather[0].main);
            $("#description").text("("+response.weather[0].description+")");
            $("#icon").attr("src",response.weather[0].icon);
            $("#temp").text(response.main.temp + "℃");
            $("#humid").text(response.main.humidity + "%");
            $("#high").text(response.main.temp_max + "℃")
            $("#low").text(response.main.temp_min + "℃")
        });
    }

    grabLocation();

    $(".tempBtn").on("click",function(e){
        let temp=$("#temp").text();
        let high=$("#high").text();
        let low=$("#low").text();
        if(temp.endsWith("℃")){
            let tempNum = parseFloat(temp.slice(0,-1));
            let highNum = parseFloat(high.slice(0,-1));
            let lowNum = parseFloat(low.slice(0,-1));
            // conversion to ℉
            let tempF = Math.round((tempNum * (9/5)) + 32);
            let highF = Math.round((highNum * (9/5)) +32);
            let lowF = Math.round((lowNum * (9/5)) + 32);
            $("#temp").text(tempF + "℉");
            $("#high").text(highF + "℉");
            $("#low").text(lowF + "℉");
        } else if (temp.endsWith("℉")){
            let tempNum = parseFloat(temp.slice(0,-1));
            let highNum = parseFloat(high.slice(0,-1));
            let lowNum = parseFloat(low.slice(0,-1)); 
            // conversion to  ℃
            let tempC = Math.round((tempNum - 32) / (9/5));
            let highC = Math.round((highNum - 32) / (9/5));
            let lowC = Math.round((lowNum - 32) / (9/5));
            $("#temp").text(tempC + "℃");
            $("#high").text(highC + "℃");
            $("#low").text(lowC + "℃");
        }
    });
}