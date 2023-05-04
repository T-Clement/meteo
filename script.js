// const searchInput = document.querySelector('input[name="search"]');
// const suggestionsList = document.querySelector("#suggestions");

// async function searchCities(query) {
//     if (query.length >= 3) {
//         const response = await fetch(
//             `https://api.weatherapi.com/v1/search.json?key=dfb545a573604021be494635230205&q=${query}`
//         );
//         const cities = await response.json();

//         if (Array.isArray(cities)) {
//             const suggestions = cities
//                 .map(
//                     (city) =>
//                         `<button>${city.name} (${city.region}), ${city.country}</button>`
//                 )
//                 .join("");
//             suggestionsList.innerHTML = suggestions;
//             const cityButtons = document.querySelectorAll(
//                 "#suggestions button"
//             );
//             cityButtons.forEach((button) => {
//                 button.addEventListener("click", () => {
//                     searchInput.value = button.textContent;
//                     suggestionsList.innerHTML = "";
//                 });
//             });
//         }
//     }
// }

// let timer;

// searchInput.addEventListener("keyup", () => {
//     clearTimeout(timer);
//     timer = setTimeout(function () {
//         const query = searchInput.value.trim();
//         searchCities(query);
//         console.log(query);
//     }, 500);
// });

const searchInput = document.querySelector('input[name="search"]');
const suggestionsList = document.querySelector("#suggestions");
let img = document.querySelector("#icon_weather");

async function searchCities(query) {
    if (query.length >= 3) {
        const response = await fetch(
            `https://api.weatherapi.com/v1/search.json?key=dfb545a573604021be494635230205&q=${query}`
        );
        const cities = await response.json();

        if (Array.isArray(cities)) {
            const suggestions = cities
                .map(
                    (city) =>
                        `<button data-location="${city.name},${city.region},${city.country}">${city.name} (${city.region}), ${city.country}</button>`
                )
                .join("");
            suggestionsList.innerHTML = suggestions;
            const cityButtons = document.querySelectorAll(
                "#suggestions button"
            );
            cityButtons.forEach((button) => {
                button.addEventListener("click", async () => {
                    const location = button.dataset.location;
                    searchInput.value = location;
                    suggestionsList.innerHTML = "";

                    const response = await fetch(
                        `https://api.weatherapi.com/v1/current.json?key=dfb545a573604021be494635230205&q=${location}`
                    );
                    const weatherData = await response.json();

                    const temperature = document.getElementById("temperature");
                    temperature.innerText = `Température actuelle à ${weatherData.location.name}: ${weatherData.current.temp_c}°C`;
                    img.src = `${weatherData.current.condition.icon}`
                    // console.log(
                    //     `Température actuelle à ${weatherData.location.name}: ${weatherData.current.temp_c}°C`
                    // );
                    // console.log(
                    //     `Temps actuel à ${weatherData.location.name}: ${weatherData.current.condition.text}`
                    // );
                });
            });
        }
    }
}

let timer;

searchInput.addEventListener("keyup", () => {
    clearTimeout(timer);
    timer = setTimeout(function () {
        const query = searchInput.value.trim();
        searchCities(query);
        console.log(query);
    }, 500);
});

