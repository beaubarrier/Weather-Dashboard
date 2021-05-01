let todaysDate = moment().format('MM-DD-YYYY');
let searchButton = $("#searchButton");
let apiKey = '040c379ac50ebf6e6db25c1185879ee0';
const searchHistory = [];


$("#date-display").text(todaysDate)



//display function_
function displayInfo(lat, lon, cityName) {


    let apiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&units=imperial&appid=` + apiKey;

    fetch(apiLink).then(function (response) {
        if (response.status == 200) {

            response.json().then(function (oneCallData) {
                console.log(oneCallData)

                console.log(apiLink)
                // iconId = data.weather[0].icon;



                let citySelectionCard = $("#mainCityCard");
                let tempDisplay = $("#tempDisplay")
                let tempIcon = $("#tempIconDisplay")
                let humidDisplay = $("#humidDisplay")
                let windDisplay = $("#windDisplay")
                let uvDisplay = $("#uvDisplay")

                //Cleaning the old data 
                tempIcon.empty();


                citySelectionCard.text(cityName);
                tempDisplay.text("Temperature: " + oneCallData.current.temp);
                tempIcon.append(`<img src="http://openweathermap.org/img/wn/${oneCallData.current.weather[0].icon}.png"/>`);
                humidDisplay.text("Humidity: " + oneCallData.current.humidity + "%");

                // //need to add the the wind speed, will not work like the others. 
                windDisplay.text("Wind Speed: " + oneCallData.current.wind_speed);
                uvDisplay.text("UV Index: " + oneCallData.current.uvi);

                //FORECAST WEATHER 
                console.log(oneCallData.daily.length)
                console.log("Day Forecast", oneCallData.daily)
                if (oneCallData.daily.length > 0) {//
                    //clears icons_
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

                    //CARD 0
                    var forecastDate = new Date(oneCallData.daily[0].dt * 1000).toLocaleDateString("en-US")
                    var forecastIcon = (`<img src="http://openweathermap.org/img/wn/${oneCallData.daily[0].weather[0].icon}.png"/>`)
                    var forecastTemp = ("Temperature: " + oneCallData.daily[0].temp.day);
                    var forecastHumid = ("Humidity: " + oneCallData.daily[0].humidity + "%");
                    $("#card0-date").text(forecastDate);
                    $("#card0-temp").text(forecastTemp);
                    $("#card0-humid").text(forecastHumid);
                    $("#card0-icon").append(forecastIcon);
                    //CARD 1                     console.log(oneCallData.daily[0].humidity)
                    var forecastDate = new Date(oneCallData.daily[1].dt * 1000).toLocaleDateString("en-US")
                    var forecastTemp = ("Temperature: " + oneCallData.daily[1].temp.day);
                    var forecastIcon = (`<img src="http://openweathermap.org/img/wn/${oneCallData.daily[1].weather[0].icon}.png"/>`)
                    var forecastHumid = ("Humidity: " + oneCallData.daily[1].humidity + "%");
                    $("#card1-date").text(forecastDate);
                    $("#card1-temp").text(forecastTemp);
                    $("#card1-temp").text(forecastTemp);
                    $("#card1-humid").text(forecastHumid);
                    $("#card1-icon").append(forecastIcon);
                    //CARD 2
                    var forecastDate = new Date(oneCallData.daily[2].dt * 1000).toLocaleDateString("en-US")
                    var forecastTemp = ("Temperature: " + oneCallData.daily[2].temp.day);
                    var forecastIcon = (`<img src="http://openweathermap.org/img/wn/${oneCallData.daily[2].weather[0].icon}.png"/>`)
                    var forecastHumid = ("Humidity: " + oneCallData.daily[2].humidity + "%");
                    $("#card2-date").text(forecastDate);
                    $("#card2-temp").text(forecastTemp);
                    $("#card2-temp").text(forecastTemp);
                    $("#card2-humid").text(forecastHumid);
                    $("#card2-icon").append(forecastIcon);
                    //CARD 3
                    var forecastDate = new Date(oneCallData.daily[3].dt * 1000).toLocaleDateString("en-US")
                    var forecastTemp = ("Temperature: " + oneCallData.daily[3].temp.day);
                    var forecastIcon = (`<img src="http://openweathermap.org/img/wn/${oneCallData.daily[3].weather[0].icon}.png"/>`)
                    var forecastHumid = ("Humidity: " + oneCallData.daily[3].humidity + "%");
                    $("#card3-date").text(forecastDate);
                    $("#card3-temp").text(forecastTemp);
                    $("#card3-temp").text(forecastTemp);
                    $("#card3-humid").text(forecastHumid);
                    $("#card3-icon").append(forecastIcon);
                    //CARD 4
                    var forecastDate = new Date(oneCallData.daily[4].dt * 1000).toLocaleDateString("en-US")
                    var forecastTemp = ("Temperature: " + oneCallData.daily[4].temp.day);
                    var forecastIcon = (`<img src="http://openweathermap.org/img/wn/${oneCallData.daily[4].weather[0].icon}.png"/>`)
                    var forecastHumid = ("Humidity: " + oneCallData.daily[4].humidity + "%");
                    $("#card4-date").text(forecastDate);
                    $("#card4-tewmp").text(forecastTemp);
                    $("#card4-temp").text(forecastTemp);
                    $("#card4-humid").text(forecastHumid);
                    $("#card4-icon").append(forecastIcon);

                    var key = cityName;
                    var value = oneCallData;
                    localStorage.setItem(key, value);

                    createHistoryItem(key, value)
                }
            })

        }

    })

}//****** display function ends here_ ***********/


//search button_
searchButton.on("click", function (event) {
    // createHistoryItem();
    event.preventDefault();
    let searchInput = $("#searchInput").val();
    // let apiLink = `http://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=imperial&appid=` + apiKey;
    let apiLink = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput},US&limit=5&appid=${apiKey}`;



    fetch(apiLink).then(function (response) {
        if (response.status == 200) {

            response.json().then(function (data) {

                console.log(apiLink)
                console.log(data)

                displayInfo(data[0].lat, data[0].lon, data[0].name);

            })
        } else {
            alert("Please enter valid city name.")
        }
    })
        .catch(function () {
            console.log("Bad Request")
        })



})// search button ends here_






function createHistoryItem() {

    var $item = $('<input type="button" value="" />')
    let searchInput = $("#searchInput").val();
    $item.val(searchInput)
    $item.appendTo("#historySpot")
    $item.on("click", function () {
        let apiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&units=imperial&appid=` + apiKey;

        fetch(apiLink).then(function (response) {
            if (response.status == 200) {

                response.json().then(function (oneCallData) {
                    console.log(oneCallData)

                    console.log(apiLink)

                })
            }

        })
    })
}

    //     var key = cityName;
    //     var value = oneCallData;
    //     localStorage.setItem(key, value);



