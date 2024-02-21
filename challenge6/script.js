const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".Search-btn")
const forecastcontainer=document.querySelector(".weather-cards")
const currentweather=document.querySelector(".current-weather")
const historysection=document.querySelector(".history-section")

const API_kEY = "df3fb9934a7d8ebae97c6749b588071a"; // API key for OpenWeatherMap API 
let weathercards=""
const createWeatherCard = (weatherItem) => {
    console.log(weatherItem)
    const weathericon=weatherItem.weather[0].icon
    let currentdate=new Date(weatherItem.dt*1000).toLocaleDateString().split(",")[0]
    console.log(currentdate)
    weathercards +=`<li class="card">
                <h3> (${currentdate})</h3>
                <img src="https://openweathermap.org/img/wn/${weathericon}@2x.png" alt="weather-icon">
                <h4>Temperature: ${weatherItem.main.temp}°F</h4>
                <h4>Wind: ${weatherItem.wind.speed} MPH</h4>
                <h4>Humidity: ${weatherItem.main.humidity}%</h4>
            </li>`;
            forecastcontainer.innerHTML=weathercards
}

const getWeatherDetails = (lat, lon) => {
    const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_kEY}`;

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        // Filter the forecasts to get only onw forecast per day
        
        let forecastdata=data.list
        
        let fiveDayForecast=forecastdata.filter((day)=>day.dt_txt.includes("12:00:00"))
        console.log(fiveDayForecast)
        // const unqueForcastDays = [];
        // const foveDaysForecast = data.list.filter(forecast => {
        //     const forecastDate = new Date(forecast.dt_txt).getDate();
        //     if(unqueForcastDays.includes(forecastDate)) {
        //         return unqueForcastDays.push(forecastDate);
        //     }
        // });
        
        // console.log(ficeDaysForecast);
        fiveDayForecast.forEach(weatherItem => {
            createWeatherCard(weatherItem);

        })
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast coordinates!");
    });
}
 
const getcitycoordinates = (cityName) => {
    console.log("click")
    
    if(!cityName) return; // Return if CityName is empty
    const GEOCODING_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${API_kEY}`
    
    // Get entered city coordinates (latitude, longtitude, and name) from the API response
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        console.log(data)
        const todayicon=data.weather[0].icon

        let currentweathercard=""
        currentweathercard+=`
        
        <div class="details">
                    <h2> ${data.name} </h2>
                    <img src="https://openweathermap.org/img/wn/${todayicon}@2x.png" alt="weather-icon">
                    <h4>Temperature: ${data.main.temp}°F</h4>
                    <h4>Wind: ${data.wind.speed} MPH</h4>
                    <h4>Humidity: ${data.main.humidity}</h4>
                </div>
                `
                currentweather.innerHTML=currentweathercard

        const lat=data.coord.lat
        const lon=data.coord.lon
        console.log(lat, lon)
    getWeatherDetails(lat, lon);

    }).catch(() => {
        alert("An error occurred while fetching the coordinates!");
    });
}
function savecity(){
    let passcity=cityInput.value.trim()
    const historystorage=JSON.parse(localStorage.getItem("historystorage")) || []
    historystorage.push(passcity)
    localStorage.setItem("historystorage",JSON.stringify(historystorage))
    displaypassedbuttons(historystorage)
}
function displaypassedbuttons(historystorage){
    historystorage.forEach((city)=>{
        let buttons=document.createElement("button")
        buttons.textContent=city
        historysection.appendChild(buttons)
        buttons.addEventListener("click",function(event){
            event.preventDefault()
            let research=buttons.textContent
            getcitycoordinates(research)
        })


    })
    

}
searchButton.addEventListener("click", function(event){
    console.log("click")
    event.preventDefault()
    const cityName = cityInput.value.trim(); // Get user entered city name and remove extra space
    getcitycoordinates(cityName)
    savecity() 
});


