let searchButton = $("#searchButton");

searchButton.on("click", function (event) {
    event.preventDefault();
    let searchInput = $("#searchInput").val();
    let apiLink = `http://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=imperial&appid=040c379ac50ebf6e6db25c1185879ee0`;

    fetch(apiLink).then(function (response) {
        if (response.status == 200) {

            response.json().then(function (data) {
                displayInfo(data)
                console.log(apiLink)
            })
        } else {
            alert("Please enter valid city name.")
        }
    })
        .catch(function () {
            console.log("Bad Request")
        })
})
function displayInfo(rawData) {
    let citySelectionCard = $("#tempDisplay");
    // let cityName = $("#cityName")
    // let temp = $("tempDisplay")
    // let wind = $("windDisplay")
    console.log(rawData);
    citySelectionCard.text(rawData.data.results[0].name);


}//******Function Ends HERE!***********/



    //     fetch(apiLink).then(function (response) {
    //         if (response.status == 200) {
    //             response.json().then(function (data) {
    //                 displayInfo(data)
    //             })
    //         } else {
    //             alert("Please enter the name of a city.")
    //         }
    //     })
    //         .catch(function () {
    //             console.log(apiLink)
    //         })
    // })

