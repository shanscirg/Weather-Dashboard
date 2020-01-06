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
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        tempF = tempF.toFixed(2);
        $("#temp").text("Temperature: " + tempF + " \xB0" + "F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind Speed: " + response.wind.speed + " mph");
        // $("#uvIndex").text("UV Index: " + response.)
    })
});

$("#nextDay1").text(moment().add(1,'days').format('l'));
$("#nextDay2").text(moment().add(2,'days').format('l'));
$("#nextDay3").text(moment().add(3,'days').format('l'));
$("#nextDay4").text(moment().add(4,'days').format('l'));
$("#nextDay5").text(moment().add(5,'days').format('l'));



// const searchWeather = function (cityChoice) {



