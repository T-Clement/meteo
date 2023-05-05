// display none element transitionned after and of transition
const logoTransition = document.querySelector(".logo-transition");
logoTransition.addEventListener("animationend", function () {
    logoTransition.style.display = "none";
});

// normalize() convert string to normalize Unicode format   +  replace for replace by empty string special caracters
function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const searchInput = document.querySelector('input[name="search"]');
const suggestionsList = document.querySelector("#suggestions");
const header = document.querySelector("header");
let img = document.querySelector("#icon__weather");
let imgFuture1 = document.querySelector("#icon__weather--future-day1");
let imgFuture2 = document.querySelector("#icon__weather--future-day2");
let imgFuture3 = document.querySelector("#icon__weather--future-day3");

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
                        `<button data-location="${city.name}, ${city.region}, ${city.country}">${city.name} (${city.region}), ${city.country}</button>`
                )
                .join("");
            suggestionsList.innerHTML = suggestions;
            const cityButtons = document.querySelectorAll(
                "#suggestions button"
            );
            cityButtons.forEach((button) => {
                button.addEventListener("click", async () => {

                    // changement de header avec une animation
                    // au clic ajouter l'animation à header--landing
                    // header.

                    header.classList.remove('header--landing');
                    document.querySelector("form").classList.remove('form--landing');
                    document.querySelector(".section-main").classList.remove('hidden');
                    document.querySelector(".future").classList.remove('hidden');
                    const location = button.dataset.location;
                    searchInput.value = location;
                    suggestionsList.innerHTML = "";

                    // changement de page
                    // window.location.href = "weather.html";

                    const response = await fetch(
                        `https://api.weatherapi.com/v1/forecast.json?key=dfb545a573604021be494635230205&q=${location}&lang=fr&days=4&aqi=yes&alerts=no`
                    );
                    const weatherData = await response.json();

                    const temperature = document.getElementById("temperature");
                    temperature.innerText = `${weatherData.current.temp_c}°C`;
                    const loc = document.getElementById("loc");
                    loc.innerText = `${weatherData.location.name} (${weatherData.location.region}), ${weatherData.location.country}`;

                    // img.src = `${weatherData.current.condition.icon}`;
                    // let url = img.src;

                    // changer la taille/qualité de l'icône en 128x128
                    let qualityOfIcon = "128x128";
                    let url = `${weatherData.current.condition.icon}`;
                    let urlModified = url.split("/");
                    urlModified[4] = qualityOfIcon;
                    urlModified = urlModified.join("/");
                    img.src = `${urlModified}`;

                    // autres fonctionnalités
                    const sunrise = document.getElementById("sunrise");
                    sunrise.innerText = `Lever du soleil: ${weatherData.forecast.forecastday[0].astro.sunrise}`;
                    const sunset = document.getElementById("sunset");
                    sunset.innerText = `Coucher du soleil: ${weatherData.forecast.forecastday[0].astro.sunset}`;
                    
                    imgFuture1.src = `${weatherData.forecast.forecastday[1].day.condition.icon}`;
                    futureDate__date1.innerText = `${weatherData.forecast.forecastday[1].date}`;
                    futureDate__temp1.innerText = `${weatherData.forecast.forecastday[1].day.avgtemp_c}°C`;

                    imgFuture2.src = `${weatherData.forecast.forecastday[2].day.condition.icon}`;
                    futureDate__date2.innerText = `${weatherData.forecast.forecastday[2].date}`;
                    futureDate__temp2.innerText = `${weatherData.forecast.forecastday[2].day.avgtemp_c}°C`;

                    imgFuture3.src = `${weatherData.forecast.forecastday[3].day.condition.icon}`;
                    futureDate__date3.innerText = `${weatherData.forecast.forecastday[3].date}`;
                    futureDate__temp3.innerText = `${weatherData.forecast.forecastday[3].day.avgtemp_c}°C`;
                    
                    let future = Date(weatherData.forecast.forecastday[1].date);
                    console.log(future);
                });
            });
        }
    }
}

window.addEventListener("click", (event) => {
    if (
        !event.target.matches("#suggestions") &&
        !event.target.matches('input[name="search"]')
    ) {
        suggestionsList.innerHTML = "";
    }
});

let timer;

searchInput.addEventListener("keyup", () => {
    clearTimeout(timer);
    timer = setTimeout(function () {
        const query = searchInput.value.trim();
        searchCities(removeAccents(query));
    }, 500);
});

async function toGetValuesfromCity2(name) {
    let response = await fetch(
        `    https://api.weatherapi.com/v1/forecast.json?key=dfb545a573604021be494635230205&q=${name}&days=3&aqi=yes&alerts=no`
    );
    let valuesAPI = await response.json();
}
toGetValuesfromCity2("Caen");

