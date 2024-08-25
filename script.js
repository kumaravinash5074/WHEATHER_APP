const API_KEY = "bcf8488b523979ad021cba7e2e1ac5e6"; 
const getLocationButton = document.getElementById("getLocation");
const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const cityName = document.getElementById("cityName");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

getLocationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherByCity(city);
    }
});

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetchWeatherByCoords(lat, lon);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

async function fetchWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert("Failed to fetch weather data.");
    }
}

async function fetchWeatherByCity(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert("Failed to fetch weather data.");
    }
}

function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    description.textContent = `Weather: ${data.weather[0].description}`;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    weatherResult.classList.remove("hidden");
}
