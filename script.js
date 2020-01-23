// Add background image to jumbotron
let image = "https://openweathermap.org/themes/openweathermap/assets/img/new-history-forecast-bulk.png"
$("#jumbotron").css("background-image", "url(" + image + ")");

// Change font style of city and 5-day forecast
$(".fontfam").css("font-family", "Century");
$("#left").css("background-color", "#EEF2F6");

// Function that converts Kelvin to Fahrenheit
function convertTemp(tempKelvin) {
    let tempF = (tempKelvin - 273.15) * 1.80 + 32;
    tempF = tempF.toFixed(2);
    return tempF;
}

// Add dates to 5-day forecast cards
$("#nextDay1").text(moment().add(1, 'days').format('l'));
$("#nextDay2").text(moment().add(2, 'days').format('l'));
$("#nextDay3").text(moment().add(3, 'days').format('l'));
$("#nextDay4").text(moment().add(4, 'days').format('l'));
$("#nextDay5").text(moment().add(5, 'days').format('l'));

// Hide 5-day forecast cards
$("#fiveDay").hide();
$("#cards").hide();

// Add space between city and current weather info
$("#space").append("<hr><hr>");

// Does city exist?
// var cityExists = true;

// Stores cities to local storage and adds each one to the city list
function showStoredSearches() {
    if (typeof cityChoice !== 'undefined' && cityChoice !== null) {
        const cityList = JSON.parse(localStorage.getItem('cityList')) || [];
        const cityChoice = $("#cityChoice").val();
        console.log('includes?', cityList.includes(cityChoice));
        if (!cityList.includes(cityChoice) && cityChoice !== "") {
            cityList.push(cityChoice)
            localStorage.setItem('cityList', JSON.stringify(cityList));
        }
        function makeSearchButtons() {
            $("#savedSearches").empty();
            for (let i = 0; i < cityList.length; i++) {
                let currentCity = cityList[i];
                let savedCity = $("<button type='button' class='savedCity'>" + currentCity + "</button><p></p>");
                $("#savedSearches").prepend(savedCity);
            }
        }
        makeSearchButtons();
    }
}

// Show weather (current & forecast) info
function showWeather(cityChoice) {
    // current weather
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityChoice + "&APPID=c20a03310efa2dbd0d1d7eb369964143";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#cityName").text(response.name).append(" (" + moment().format('l') + ")").append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='Weather Icon'>");
        let currentTemp = response.main.temp;
        $("#temp").text("Temperature: " + convertTemp(currentTemp) + " \xB0" + "F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind Speed: " + response.wind.speed + " mph");

        // UV index
        const cityLat = response.coord.lat;
        const cityLon = response.coord.lon;
        const queryURL3 = "https://api.openweathermap.org/data/2.5/uvi?appid=c20a03310efa2dbd0d1d7eb369964143&lat=" + cityLat + "&lon=" + cityLon;
        $.ajax({
            url: queryURL3,
            method: "GET"
        }).then(function (response) {
            $("#uvIndex").text("UV Index: " + response.value);
        })
    }).catch(function (error) {
        cityChoice = 'undefined';
        // cityExists = false;
        alert("City cannot be found. Please try again!")
        console.log(error);
        // console.log(cityExists);
    })
    // console.log(cityExists);
    // 5-day forecast
    const queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityChoice + "&APPID=c20a03310efa2dbd0d1d7eb369964143";
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {
        $("#img1").empty();
        $("#img2").empty();
        $("#img3").empty();
        $("#img4").empty();
        $("#img5").empty();
        $("#img1").append("<img src='https://openweathermap.org/img/w/" + response.list[3].weather[0].icon + ".png' alt='Weather Icon'>");
        let currentTemp = response.list[3].main.temp;
        $("#temp1").text("Temp: " + convertTemp(currentTemp) + " \xB0" + "F");
        $("#humidity1").text("Humidity: " + response.list[3].main.humidity + "%");
        $("#img2").append("<img src='https://openweathermap.org/img/w/" + response.list[11].weather[0].icon + ".png' alt='Weather Icon'>");
        let currentTemp2 = response.list[11].main.temp;
        $("#temp2").text("Temp: " + convertTemp(currentTemp2) + " \xB0" + "F");
        $("#humidity2").text("Humidity: " + response.list[11].main.humidity + "%");
        $("#img3").append("<img src='https://openweathermap.org/img/w/" + response.list[19].weather[0].icon + ".png' alt='Weather Icon'>");
        let currentTemp3 = response.list[19].main.temp;
        $("#temp3").text("Temp: " + convertTemp(currentTemp3) + " \xB0" + "F");
        $("#humidity3").text("Humidity: " + response.list[19].main.humidity + "%");
        $("#img4").append("<img src='https://openweathermap.org/img/w/" + response.list[27].weather[0].icon + ".png' alt='Weather Icon'>");
        let currentTemp4 = response.list[27].main.temp;
        $("#temp4").text("Temp: " + convertTemp(currentTemp4) + " \xB0" + "F");
        $("#humidity4").text("Humidity: " + response.list[27].main.humidity + "%");
        $("#img5").append("<img src='https://openweathermap.org/img/w/" + response.list[35].weather[0].icon + ".png' alt='Weather Icon'>");
        let currentTemp5 = response.list[35].main.temp;
        $("#temp5").text("Temp: " + convertTemp(currentTemp5) + " \xB0" + "F");
        $("#humidity5").text("Humidity: " + response.list[35].main.humidity + "%");
    })
};

// When city submit button is clicked, show weather and save search
$("#submitCity").on("click", function (event) {
    event.preventDefault();
    $("#fiveDay").show();
    $("#cards").show();
    const cityChoice = $("#cityChoice").val();
    showWeather(cityChoice);
    showStoredSearches();
    $("#cityForm").trigger("reset");
})

// Show weather info when previously searched city buttons are clicked
$("#savedSearches").on('click', '.savedCity', function () {
    $("#fiveDay").show();
    $("#cards").show();
    const cityChoice = $(this).text();
    showWeather(cityChoice);
})

$(document).ready(function () {
    showStoredSearches();
});