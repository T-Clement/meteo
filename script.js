// async function toGetCity(name) {
//     let response = await fetch(
//         `https://api.weatherapi.com/v1/search.json?key=dfb545a573604021be494635230205&q=${name}`
//     );
//     let cityAPI = await response.json();
//     console.log(cityAPI);
// }
// toGetCity("saint jean");
// async function toGetCity() {
//     let response = await fetch(
//         `https://api.weatherapi.com/v1/search.json?key=dfb545a573604021be494635230205&q=Caen`
//     );
//     let cityAPI = await response.json();
//     console.log(cityAPI);
// }
// toGetCity();

// async function toGetValuesfromCity(name) {
//     let response = await fetch(
//         `https://api.weatherapi.com/v1/current.json?key=dfb545a573604021be494635230205&q=${name}&aqi=no`
//     );
//     let valuesAPI = await response.json();
//     console.log(valuesAPI);
// }
// toGetValuesfromCity("Marseille");

// Forecast to 10 days
// async function getForecastTo10Days(name) {
//     let response = await fetch(
//         `https://api.weatherapi.com/v1/forecast.json?key=dfb545a573604021be494635230205&q=Caen&days=10&aqi=no&alerts=no`
//     );
//     let valuesAPI = await response.json();
//     console.log(valuesAPI);
// }
// getForecastTo10Days("Caen");

// let url="http://api.weatherapi.com/v1/search.json?key=dfb545a573604021be494635230205&q="
// url+=location.name
// return url
const searchInput = document.querySelector('input[name="search"]');
const suggestionsList = document.querySelector(".suggestions");

async function searchCities(query) {
    const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=dfb545a573604021be494635230205&q=${query}`
    );
    const cities = await response.json();
    const suggestions = cities
        .map((city) => `<button>${city.name}</button>`)
        .join("");
    suggestionsList.innerHTML = suggestions;
    const cityButtons = document.querySelectorAll(".suggestions button");
    cityButtons.forEach((button) => {
        button.addEventListener("click", () => {
            searchInput.value = button.textContent;
            suggestionsList.innerHTML = "";
        });
    });
}
searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    if (query.length > 2) {
        searchCities(query);
    } else {
        suggestionsList.innerHTML = "";
    }
});
toGetCity();
