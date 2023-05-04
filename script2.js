// function getAPI(){
//     fetch('http://api.weatherapi.com/v1/search.json?key=dfb545a573604021be494635230205&q=London')
// }

// console.log(getAPI())

// async function waitingForResponse(name) {
//     let response = await fetch(
//         "https://api.weatherapi.com/v1/search.json?key=dfb545a573604021be494635230205&q="
//     );
//     let cityAPI = await response.json();
//     console.log(cityAPI);
// }
// console.log(waitingForResponse('caen'))

/*
let url="http://api.weatherapi.com/v1/search.json?key=dfb545a573604021be494635230205&q="
url+=location.name
return url

let date=document.querySelector("#date")
let bouton=document.querySelector("#ok")
let img=document.querySelector("#starshot")

//bouton pour lancer la fonction 
bouton.addEventListener("click", verifdate)

//fonction pour verifier si la date est valide
function verifdate(){
let ajd=new Date()
let datev=new Date(date.value)
    console.log(ajd)
    console.log(date.value)
    //faire un if : si la date selectionné est supérieur à la date d'ajd, au lieu d'ex afficher 
    if(datev.getTime()>ajd.getTime()){
        alert("Impossible, ce jour n'est pas encore arrivé...")
    }
    else {
        getapi()
    }
}

//fonction pour mettre la date d'ajd au bon format (inutile MAIS fonction interressante)
// function today(){
//     let aujourdhui= new Date()
    
//     let month=aujourdhui.getMonth()
//         if (month<10){  
//             month = '0' + month;
//         }

//     console.log(month)

//     let day=aujourdhui.getDate()
//         if (day<10){
//              day = '0' + day;
//         }

//    console.log(day)

//    return new Date(aujourdhui.getFullYear()+"-"+month+"-"+day)
// }

//fonction qui recup la value de l'input
function getapi(){
    let test=newurl()
    console.log(api(test))
    console.log(date.value)
}


//modif l'url pour add la date formatée
function newurl() {
    let url="https://api.nasa.gov/planetary/apod?api_key=q3FTYte4TvTO14qFNrTJLgQWubCphnmMuXfN78eZ&date=";
    url+=date.value;
    console.log(url);
    return url;
}

//remplacer la fonction api par la nouvelle url
function api(url){
    fetch(url)
    .then(res=>res.json())
    .then(result=>img.src=result.hdurl)
}*/

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
                    console.log(
                        `Température actuelle à ${weatherData.location.name}: ${weatherData.current.temp_c}°C`
                    );
                    console.log(
                        `Temps actuel à ${weatherData.location.name}: ${weatherData.current.condition.text}`
                    );
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

// async function searchWeather(query){
//     const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=dfb545a573604021be494635230205&q=caen&aqi=no`);
//     const weather = await response.json();
//     console.log(weather.current.temp_c);
// }

// async function toGetCity(name) {
//     let response = await fetch(
//         `https://api.weatherapi.com/v1/search.json?key=dfb545a573604021be494635230205&q=${name}`
//     );
//     let cityAPI = await response.json();
//     console.log(cityAPI);
// }
// toGetCity("Wurzburg");

// async function toGetValuesfromCity(name) {
//     let response = await fetch(
//         `https://api.weatherapi.com/v1/current.json?key=dfb545a573604021be494635230205&q=${name}&aqi=no`
//     );
//     let valuesAPI = await response.json();
//     console.log(valuesAPI);
// }
// toGetValuesfromCity("Caen");

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


const searchInput = document.querySelector('input[name="search"]');
const suggestionsList = document.querySelector("#suggestions");


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
                        `<button>${city.name} (${city.region}), ${city.country}</button>`
                )
                .join("");
            suggestionsList.innerHTML = suggestions;
            const cityButtons = document.querySelectorAll(
                "#suggestions button"
            );
            cityButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    searchInput.value = button.textContent;
                    suggestionsList.innerHTML = "";
                    img.src = 
                    // result => img.src
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
    }, 500);
});




// async function searchWeather(query){
//     const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=dfb545a573604021be494635230205&q=caen&aqi=no`);
//     const weather = await response.json();
//     console.log(weather.current.temp_c);
// }
async function toGetValuesfromCity(name) {
    let response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=dfb545a573604021be494635230205&q=${name}&aqi=no`
    );
    let valuesAPI = await response.json();
    console.log(valuesAPI.current);
}
toGetValuesfromCity("");

// async function toGetCity(name) {
//     let response = await fetch(
//         `https://api.weatherapi.com/v1/search.json?key=dfb545a573604021be494635230205&q=${name}`
//     );
//     let cityAPI = await response.json();
//     console.log(cityAPI);
// }
// toGetCity("Wurzburg");


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
