// selectors
const temperatureDescription = document.querySelector('.temperature-description');
const temperatureDegree = document.querySelector('.temperature-degree');
const locationCity = document.querySelector('.location-city');
const locationCountry = document.querySelector('.location-country');
const temperatureSection = document.querySelector('.degree-section');
const temperatureSpan = document.querySelector('.degree-section span');
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');

//global
let changeTemp;

// event listener
searchButton.addEventListener('click', searchCity);

// helper function
function getAPIResponse(apiURL) {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let temp = data.main.temp;
            let faren = Math.floor((temp * (9 / 5) - 459.67));
            let celcius = Math.floor((faren - 32) * (5 / 9));
            temperatureDegree.textContent = faren;
            temperatureDescription.textContent = data.weather[0].description;
            locationCity.textContent = data.name;
            locationCountry.textContent = data.sys.country;

            changeTemp = () => {
                if (temperatureSpan.textContent === "F") {
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = celcius;
                } else {
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = faren;
                }
            };

            temperatureSection.addEventListener('click', changeTemp);
        })
        .catch(function () {
            alert("City not found");
        });
}

function searchCity(event) {
    event.preventDefault();
    if (searchInput.value === undefined) {
        alert("Please input a valid City");
        return;
    }
    const input = searchInput.value;
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=0048dbc7421e263047b7901f9e5923b9`
    temperatureSection.removeEventListener('click', changeTemp);
    searchInput.value = "";
    getAPIResponse(api);
    setTimeout(1);
}

// on load
window.addEventListener('load', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=0048dbc7421e263047b7901f9e5923b9`
            getAPIResponse(api);
        });
    }
});