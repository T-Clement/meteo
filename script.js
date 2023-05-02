async function toGetCity(name) {
    let response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=dfb545a573604021be494635230205&q=${name}`
    );
    let cityAPI = await response.json();
    console.log(cityAPI);
}
toGetCity("Wurzburg");

// let url="http://api.weatherapi.com/v1/search.json?key=dfb545a573604021be494635230205&q="
// url+=location.name
// return url
