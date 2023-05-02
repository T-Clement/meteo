async function toGetCity(name) {
    let response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=dfb545a573604021be494635230205&q=${name}`
    );
    let cityAPI = await response.json();
    console.log(cityAPI);
}
toGetCity("Wurzburg");

async function toGetValuesfromCity(name) {
    let response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=dfb545a573604021be494635230205&q=${name}&aqi=no`
    );
    let valuesAPI = await response.json();
    console.log(valuesAPI);
}
toGetValuesfromCity("Caen");

// Forecast to 10 days
// async function toGetValuesfromCity(name) {
//     let response = await fetch(
//         `https://api.weatherapi.com/v1/forecast.json?key=dfb545a573604021be494635230205&q=Caen&days=10&aqi=no&alerts=no`
//     );
//     let valuesAPI = await response.json();
//     console.log(valuesAPI);
// }
// toGetValuesfromCity("Caen");

// https://api.weatherapi.com/v1/forecast.json?key=dfb545a573604021be494635230205&q=Caen&days=10&aqi=no&alerts=no

// let url="http://api.weatherapi.com/v1/search.json?key=dfb545a573604021be494635230205&q="
// url+=location.name
// return url