// display none element transitionned after and of transition
const logoTransition = document.querySelector(".logo-transition");
logoTransition.addEventListener("animationend", function () {
    logoTransition.style.display = "none";
});


//-----------------------------------------------------------------------------------

/**
 * This function transform accented caracter to normal caracter
 * 
 * @param {string} string - String with accented caracters
 * @return {string} Return transformed string without accents
 */
function removeAccents(string) {
    // normalize() convert string to normalize Unicode format and replace by empty string special caracters
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// ----------------------------------------------------------------------------------

/**
 * This function change the url of weather icon, origin : 64x64 new: 128x128
* 
* @param {string} url - url who passed to the API to get icon related to weather
* @return {string} Return transformed URL 
*/
function changeWeatherIconUrlTo128px(url) {
    // 128x128 is the best quality find in the CDN
    let qualityOfIcon = "128x128";
    //split the url in a array
    let urlModified = url.split("/");
    // change 64x64 to 128x128
    urlModified[4] = qualityOfIcon;
    // join the array in a string
    urlModified = urlModified.join("/");
    return urlModified
}

// ----------------------------------------------------------------------------------

/**
 * This function display the weather by removing CSS classes "--landing" variants
 * 
 */
function displayWeather() {
    //remove css classes
    header.classList.remove('header--landing');
    document.querySelector("form").classList.remove('form--landing');
    document.querySelector(".section-main").classList.remove('hidden');
    document.querySelector(".section-div__localisation").classList.remove('hidden');
    document.querySelector(".future").classList.remove('hidden');
}

// ----------------------------------------------------------------------------------




// function geoLocalisation
function getMyPosition() {
    navigator.geolocation.getCurrentPosition(async function (position) {    //navigator Objet contenant ttes les infos de l user / Geolocation obtenir la geoloc/ GetCurrentPosition Methode demande la position de l appareil de l'user et traite le retour.
        console.log("Position trouvée : Latitude=" + position.coords.latitude + " Longitude=" + position.coords.longitude);
        btnGeo.dataset.geoLoc = `${position.coords.latitude}, ${position.coords.longitude}`;
        console.log(btnGeo);
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=dfb545a573604021be494635230205&q=${btnGeo.dataset.geoLoc}&lang=fr&days=4&aqi=yes&alerts=no`
            );
        const geoWeatherData = await response.json();
        console.log(geoWeatherData);


        // display
        displayWeather();
            


        const temperature = document.getElementById("temperature");
        temperature.innerText = `${geoWeatherData.current.temp_c}°C`;
        const loc = document.getElementById("loc");
        loc.innerText = `${geoWeatherData.location.name} (${geoWeatherData.location.region}), ${geoWeatherData.location.country}`;
        
        
        // change quality of icon related to weather
        img.src = changeWeatherIconUrlTo128px(geoWeatherData.current.condition.icon);


        // autres fonctionnalités
        const sunrise = document.getElementById("sunrise");
        sunrise.innerText = `Lever du soleil: ${geoWeatherData.forecast.forecastday[0].astro.sunrise}`;
        const sunset = document.getElementById("sunset");
        sunset.innerText = `Coucher du soleil: ${geoWeatherData.forecast.forecastday[0].astro.sunset}`;
        console.log(
            `Température actuelle à ${geoWeatherData.location.name}: ${geoWeatherData.current.temp_c}°C`
        );
        console.log(
            `Temps actuel à ${geoWeatherData.location.name}: ${geoWeatherData.current.condition.text}`
        );
        imgFuture1.src = `${geoWeatherData.forecast.forecastday[1].day.condition.icon}`;
        futureDate__date1.innerText = `${geoWeatherData.forecast.forecastday[1].date}`;
        futureDate__temp1.innerText = `${geoWeatherData.forecast.forecastday[1].day.avgtemp_c}°C`;

        imgFuture2.src = `${geoWeatherData.forecast.forecastday[2].day.condition.icon}`;
        futureDate__date2.innerText = `${geoWeatherData.forecast.forecastday[2].date}`;
        futureDate__temp2.innerText = `${geoWeatherData.forecast.forecastday[2].day.avgtemp_c}°C`;

        imgFuture3.src = `${geoWeatherData.forecast.forecastday[3].day.condition.icon}`;
        futureDate__date3.innerText = `${geoWeatherData.forecast.forecastday[3].date}`;
        futureDate__temp3.innerText = `${geoWeatherData.forecast.forecastday[3].day.avgtemp_c}°C`;
        
        let future = Date(geoWeatherData.forecast.forecastday[1].date);
        console.log(future);
    }, function (error) {
        console.error("Erreur de géoloc N°" + error.code + " : " + error.message);
        console.log(error);
    }, {
        timeout: 2000,
        maximumAge: 60000
    });
}
const btnGeo = document.getElementById("btn-geoloc");
btnGeo.addEventListener("click", getMyPosition);


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

                    

                    // display
                    displayWeather();


                    const location = button.dataset.location;
                    // document.getElementById("loc").dataset
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
                    

                    // change quality of icon related to weather
                    img.src = changeWeatherIconUrlTo128px(weatherData.current.condition.icon);


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
}); // arrêter la propagation de l'évènement

let timer;

searchInput.addEventListener("keyup", () => {
    clearTimeout(timer);
    timer = setTimeout(function () {
        const query = searchInput.value.trim();
        searchCities(removeAccents(query));
    }, 500);
});