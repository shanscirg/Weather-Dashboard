// Function that converts Kelvin to Fahrenheit
function convertTemp(tempKelvin) {
    let tempF = (tempKelvin - 273.15) * 1.80 + 32;
    tempF = tempF.toFixed(2);
    return tempF;
}
$("#fiveDay").hide();
$("#cards").hide();

// When city submit button is clicked, 
$("#submitCity").on("click", function (event) {
    event.preventDefault();
    $("#fiveDay").show();
    $("#cards").show();
    const cityChoice = $("#cityChoice").val();
    console.log(cityChoice);

    // show current temp info
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityChoice + "&APPID=c20a03310efa2dbd0d1d7eb369964143";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#cityName").text(response.name).append(" (" + moment().format('l') + ")").append("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='Weather Icon'>");
        $("#space").append("<hr> <hr>");
        let currentTemp = response.main.temp;
        $("#temp").text("Temperature: " + convertTemp(currentTemp) + " \xB0" + "F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind Speed: " + response.wind.speed + " mph");
        // UV index
        const cityLat = response.coord.lat;
        const cityLon = response.coord.lon;
        const queryURL3 = "http://api.openweathermap.org/data/2.5/uvi?appid=c20a03310efa2dbd0d1d7eb369964143&lat=" + cityLat + "&lon=" + cityLon;
        $.ajax({
            url: queryURL3,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            $("#uvIndex").text("UV Index: " + response.value);
        })
    })



    // 5-day forecast
    const queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityChoice + "&APPID=c20a03310efa2dbd0d1d7eb369964143";
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#img1").append("<img src='http://openweathermap.org/img/w/" + response.list[3].weather[0].icon + ".png' alt='Weather Icon'>");
        let currentTemp = response.list[3].main.temp;
        $("#temp1").text("Temp: " + convertTemp(currentTemp) + " \xB0" + "F");
        $("#humidity1").text("Humidity: " + response.list[3].main.humidity + "%");
        $("#img2").append("<img src='http://openweathermap.org/img/w/" + response.list[11].weather[0].icon + ".png' alt='Weather Icon'>");
        let currentTemp2 = response.list[11].main.temp;
        $("#temp2").text("Temp: " + convertTemp(currentTemp2) + " \xB0" + "F");
        $("#humidity2").text("Humidity: " + response.list[11].main.humidity + "%");
        $("#img3").append("<img src='http://openweathermap.org/img/w/" + response.list[19].weather[0].icon + ".png' alt='Weather Icon'>");
        let currentTemp3 = response.list[19].main.temp;
        $("#temp3").text("Temp: " + convertTemp(currentTemp3) + " \xB0" + "F");
        $("#humidity3").text("Humidity: " + response.list[19].main.humidity + "%");
        $("#img4").append("<img src='http://openweathermap.org/img/w/" + response.list[27].weather[0].icon + ".png' alt='Weather Icon'>");
        let currentTemp4 = response.list[27].main.temp;
        $("#temp4").text("Temp: " + convertTemp(currentTemp4) + " \xB0" + "F");
        $("#humidity4").text("Humidity: " + response.list[27].main.humidity + "%");
        $("#img5").append("<img src='http://openweathermap.org/img/w/" + response.list[35].weather[0].icon + ".png' alt='Weather Icon'>");
        let currentTemp5 = response.list[35].main.temp;
        $("#temp5").text("Temp: " + convertTemp(currentTemp5) + " \xB0" + "F");
        $("#humidity5").text("Humidity: " + response.list[35].main.humidity + "%");
    })

});


$("#nextDay1").text(moment().add(1, 'days').format('l'));
$("#nextDay2").text(moment().add(2, 'days').format('l'));
$("#nextDay3").text(moment().add(3, 'days').format('l'));
$("#nextDay4").text(moment().add(4, 'days').format('l'));
$("#nextDay5").text(moment().add(5, 'days').format('l'));




// STORE CITIES
let cityList = JSON.parse(localStorage.getItem('cityList')) || [];

// function that stores cities to local storage and adds each one to the city list
function generateCity() {
    localStorage.setItem('cityList', JSON.stringify(cityList));
    for (let i = 0; i < cityList.length; i++) {
        let currentCity = cityList[i];
        console.log(currentCity);
        $("#savedSearches").prepend("<br><hr>" + currentCity);
    }
}

// when city is submitted, store it into an object and push into cityList
$("#submitCity").on("click", function (event) {
    event.preventDefault();
    let newCity = $("#cityChoice").val();
    cityList.push(newCity);
    generateCity();
})


// when past-searched city is clicked, weather info reappears for that city

// function weatherReappear(){
// }
