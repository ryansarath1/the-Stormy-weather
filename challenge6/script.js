const cityInput = document.querySelector(".city-input");
const seatchButton = document.querySelector(".search-btn")

const API_kEY = "47c87ece2cf180db7119b858d154af4c"; // API key for OpenWeatherMap API 

const createWeatherCard = (weatherItem) => {
    return `<li class="card">
                <h3> (${weatherItem})</h3>
                <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather-icon">
                <h4>Temperature: 52.74°F</h4>
                <h4>Wind: 12.37 MPH</h4>
                <h4>Humidity: 30%</h4>
            </li>`;
}

const getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_kEY}`;

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        // Filter the forecasts to get only onw forecast per day
        const unqueForcastDays = [];
        const foveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if(unqueForcastDays.includes(forecastDate)) {
                return unqueForcastDays.push(forecastDate);
            }
        });
        
        console.log(ficeDaysForecast);
        fiveDaysForecast.forEach(weatherItem => {
            createWeatherCard(weatherItem);

        })
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast coordinates!");
    });
}
 
const getcitycoordinates = () => {
    const cityName = cityInput.ariaValueMax.trim(); // Get user entered city name and remove extra space
    if(!cityName) return; // Return if CityName is empty
    const GEOCODING_API_URL = 'http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_kEY}'
    
    // Get entered city coordinates (latitude, longtitude, and name) from the API response
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        if(!data.length) return alert('No coordinates found for ${cityName}')
        const { name, lat, lon } = data[0];
    getWeatherDetails(name, lat, lon);

    }).catch(() => {
        alert("An error occurred while fetching the coordinates!");
    });
}

searchButton.addEventListener("click", getcitycoordinates0);