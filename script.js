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
    })
});

// const searchWeather = function (cityChoice) {



