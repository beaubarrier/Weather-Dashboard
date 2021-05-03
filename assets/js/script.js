let todaysDate = moment().format('MM-DD-YYYY');
let searchButton = $("#searchButton");
let apiKey = '040c379ac50ebf6e6db25c1185879ee0';
let historySpot = $("#historySpot")
let searchHistory = []

$("#date-display").text(todaysDate)


function displayInfo(lat, lon, cityName) {

    let apiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&units=imperial&appid=` + apiKey;

    fetch(apiLink).then(function (response) {
        if (response.status == 200) {

            response.json().then(function (oneCallData) {
                // console.log(oneCallData)
                // console.log(apiLink)

                //Cleaning the old data_ 
                let citySelectionCard = $("#mainCityCard");
                let tempDisplay = $("#tempDisplay")
                let tempIcon = $("#tempIconDisplay")
                let humidDisplay = $("#humidDisplay")
                let windDisplay = $("#windDisplay")
                let uvDisplay = $("#uvDisplay")
                tempIcon.empty();

                //sets HTML values_
                citySelectionCard.text(cityName);
                tempDisplay.text("Temperature: " + oneCallData.current.temp);
                tempIcon.append(`<img src="http://openweathermap.org/img/wn/${oneCallData.current.weather[0].icon}.png"/>`);
                humidDisplay.text("Humidity: " + oneCallData.current.humidity + "%");
                windDisplay.text("Wind Speed: " + oneCallData.current.wind_speed);
                uvDisplay.text("UV Index: " + oneCallData.current.uvi);

                //forecast weather_
                // console.log(oneCallData.daily.length)
                // console.log("Day Forecast", oneCallData.daily)
                if (oneCallData.daily.length > 0) {//
                    //clears icons for forecast_
                    var dailyIconDisplay0 = $("#card0-icon")
                    var dailyIconDisplay1 = $("#card1-icon")
                    var dailyIconDisplay2 = $("#card2-icon")
                    var dailyIconDisplay3 = $("#card3-icon")
                    var dailyIconDisplay4 = $("#card4-icon")
                    dailyIconDisplay0.empty();
                    dailyIconDisplay1.empty();
                    dailyIconDisplay2.empty();
                    dailyIconDisplay3.empty();
                    dailyIconDisplay4.empty();
                    //card 0
                    var forecastDate = new Date(oneCallData.daily[0].dt * 1000).toLocaleDateString("en-US")
                    var forecastIcon = (`<img src="http://openweathermap.org/img/wn/${oneCallData.daily[0].weather[0].icon}.png"/>`)
                    var forecastTemp = ("Temperature: " + oneCallData.daily[0].temp.day);
                    var forecastHumid = ("Humidity: " + oneCallData.daily[0].humidity + "%");
                    $("#card0-date").text(forecastDate);
                    $("#card0-temp").text(forecastTemp);
                    $("#card0-humid").text(forecastHumid);
                    $("#card0-icon").append(forecastIcon);
                    //card 1                    
                    var forecastDate = new Date(oneCallData.daily[1].dt * 1000).toLocaleDateString("en-US")
                    var forecastTemp = ("Temperature: " + oneCallData.daily[1].temp.day);
                    var forecastIcon = (`<img src="http://openweathermap.org/img/wn/${oneCallData.daily[1].weather[0].icon}.png"/>`)
                    var forecastHumid = ("Humidity: " + oneCallData.daily[1].humidity + "%");
                    $("#card1-date").text(forecastDate);
                    $("#card1-temp").text(forecastTemp);
                    $("#card1-temp").text(forecastTemp);
                    $("#card1-humid").text(forecastHumid);
                    $("#card1-icon").append(forecastIcon);
                    //card 2
                    var forecastDate = new Date(oneCallData.daily[2].dt * 1000).toLocaleDateString("en-US")
                    var forecastTemp = ("Temperature: " + oneCallData.daily[2].temp.day);
                    var forecastIcon = (`<img src="http://openweathermap.org/img/wn/${oneCallData.daily[2].weather[0].icon}.png"/>`)
                    var forecastHumid = ("Humidity: " + oneCallData.daily[2].humidity + "%");
                    $("#card2-date").text(forecastDate);
                    $("#card2-temp").text(forecastTemp);
                    $("#card2-temp").text(forecastTemp);
                    $("#card2-humid").text(forecastHumid);
                    $("#card2-icon").append(forecastIcon);
                    //card 3
                    var forecastDate = new Date(oneCallData.daily[3].dt * 1000).toLocaleDateString("en-US")
                    var forecastTemp = ("Temperature: " + oneCallData.daily[3].temp.day);
                    var forecastIcon = (`<img src="http://openweathermap.org/img/wn/${oneCallData.daily[3].weather[0].icon}.png"/>`)
                    var forecastHumid = ("Humidity: " + oneCallData.daily[3].humidity + "%");
                    $("#card3-date").text(forecastDate);
                    $("#card3-temp").text(forecastTemp);
                    $("#card3-temp").text(forecastTemp);
                    $("#card3-humid").text(forecastHumid);
                    $("#card3-icon").append(forecastIcon);
                    //card 4
                    var forecastDate = new Date(oneCallData.daily[4].dt * 1000).toLocaleDateString("en-US")
                    var forecastTemp = ("Temperature: " + oneCallData.daily[4].temp.day);
                    var forecastIcon = (`<img src="http://openweathermap.org/img/wn/${oneCallData.daily[4].weather[0].icon}.png"/>`)
                    var forecastHumid = ("Humidity: " + oneCallData.daily[4].humidity + "%");
                    $("#card4-date").text(forecastDate);
                    $("#card4-tewmp").text(forecastTemp);
                    $("#card4-temp").text(forecastTemp);
                    $("#card4-humid").text(forecastHumid);
                    $("#card4-icon").append(forecastIcon);
                    //set localStorage for forecasts_
                    var key = cityName;
                    var value = oneCallData;
                    localStorage.setItem(key, value);

                    createHistoryItem(key, value, cityName)




                }
                if (uvDisplay > 0 && uvDisplay < 2) {
                    uvDisplay.css("color", "green")
                }
            })
        }
    })

}
//display function ends here_ 


//search button_
searchButton.on("click", function (event) {
    event.preventDefault();

    apiCall();

})



//render search history item function_
function createHistoryItem(key, value, cityName) {
    // let cityButton = cityName + " button";

    let $item = $('<input type="button" id="savedCityButton"/>')
    let searchInput = $("#searchInput").val();

    // localStorage.getItem(cityName)

    // localStorage.setItem(cityButton, $item)
    // console.log(cityButton)
    // console.log(key, value)

    // JSON.parse(searchHistory)
    if (searchHistory.includes(cityName) === false) {
        searchHistory.push(cityName);
    }
    // JSON.stringify(searchHistory)
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory))


    console.log(JSON.stringify(searchHistory))
    $item.on("click", function () {
        localStorage.getItem(key, value)
    })
    $item.val(searchInput)
    $item.appendTo("#historySpot")
    $item.on("click", function () {

        let citySelectionCard = $("#mainCityCard");
        let tempDisplay = $("#tempDisplay")
        let tempIcon = $("#tempIconDisplay")
        let humidDisplay = $("#humidDisplay")
        let windDisplay = $("#windDisplay")
        let uvDisplay = $("#uvDisplay")
        citySelectionCard.text(key)
        tempDisplay.text("Temperature: " + value.current.temp)
        humidDisplay.text("Humidity: " + value.current.humidity + "%");
        windDisplay.text("Wind Speed: " + value.current.wind_speed);
        uvDisplay.text("UV Index: " + value.current.uvi);
        tempIcon.empty();
        tempIcon.append(`<img src="http://openweathermap.org/img/wn/${value.current.weather[0].icon}.png"/>`);

        //**********************************************************************
        //need to save the button to localStorage so it remains on page refresh_ 
        // JSON.stringify($item)                 <-
        // localStorage.setItem(cityName, $item) <- not working
        //**********************************************************************

    })
}
//search history function ends here
function searchHistoryButtons() {
    // let itemButton = $('<input type="button"/>')

    searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    // // historyClear.empty();
    // historySpot.append(searchHistory)
    // let $item = $('<input type="button" id="savedCityButton"/>')
    for (var i = 0; i < searchHistory.length; i++) {
        // localStorage.getItem(localStorage.key("searchHistory"),

        console.log(searchHistory[i])
        let $item = $(`<input type="button" id="savedCityButton" value= ${searchHistory[i]}> </button> `)

        $(historySpot).append($item)




    }

}

searchHistoryButtons();

let savedCityButton = $("#savedCityButton")
savedCityButton.on("click", function populateHistory() {
    apiCall();

})


function apiCall() {
    let searchInput = $("#searchInput").val();

    let apiLink = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput},US&limit=5&appid=${apiKey}`;
    fetch(apiLink).then(function (response) {
        if (response.status == 200) {
            response.json().then(function (data) {
                // console.log(apiLink)
                // console.log(data)
                displayInfo(data[0].lat, data[0].lon, data[0].name);
            })
        } else {
            alert("Please enter valid city name.")
        }
    })
        .catch(function () {
            console.log("Bad Request")
        })
}