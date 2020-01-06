function convertTemp(tempKelvin){
    let tempF = (tempKelvin - 273.15) * 1.80 + 32;
    tempF = tempF.toFixed(2);
    return tempF;
}

$("#submitCity").on("click", function (event) {
    event.preventDefault();
    const cityChoice = $("#cityChoice").val();
    console.log(cityChoice);
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityChoice + "&APPID=c20a03310efa2dbd0d1d7eb369964143";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#cityName").text(response.name).append(" (" + moment().format('l') + ")");
        let currentTemp = response.main.temp;
        $("#temp").text("Temperature: " + convertTemp(currentTemp) + " \xB0" + "F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind Speed: " + response.wind.speed + " mph");
        // $("#uvIndex").text("UV Index: " + response.)
    })

    // 5-day forecast
    const queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityChoice + "&APPID=c20a03310efa2dbd0d1d7eb369964143";
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        let currentTemp = response.list[3].main.temp;
        $("#temp1").text("Temp: " + convertTemp(currentTemp) + " \xB0" + "F");
        $("#humidity1").text("Humidity: " + response.list[3].main.humidity + "%");
        let currentTemp2 = response.list[11].main.temp;
        $("#temp2").text("Temp: " + convertTemp(currentTemp2) + " \xB0" + "F");
        $("#humidity2").text("Humidity: " + response.list[11].main.humidity + "%");
        let currentTemp3 = response.list[19].main.temp;
        $("#temp3").text("Temp: " + convertTemp(currentTemp3) + " \xB0" + "F");
        $("#humidity3").text("Humidity: " + response.list[19].main.humidity + "%");
        let currentTemp4 = response.list[27].main.temp;
        $("#temp4").text("Temp: " + convertTemp(currentTemp4) + " \xB0" + "F");
        $("#humidity4").text("Humidity: " + response.list[27].main.humidity + "%");
        let currentTemp5 = response.list[35].main.temp;
        $("#temp5").text("Temp: " + convertTemp(currentTemp5) + " \xB0" + "F");
        $("#humidity5").text("Humidity: " + response.list[35].main.humidity + "%");
    })

});




$("#nextDay1").text(moment().add(1,'days').format('l'));
$("#nextDay2").text(moment().add(2,'days').format('l'));
$("#nextDay3").text(moment().add(3,'days').format('l'));
$("#nextDay4").text(moment().add(4,'days').format('l'));
$("#nextDay5").text(moment().add(5,'days').format('l'));



// const searchWeather = function (cityChoice) {



