const apiKey = '534706498a748c6517ebf3edac33b6ea';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const errorMsg = document.querySelector('.error-msg');

async function updateWeatherData(city = 'cairo') {
    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
    // handling invalid city names
    if (response.status === 404) {
        errorMsg.classList.add('active');
        setTimeout(() => {
            errorMsg.classList.remove('active');
        }, 2500);
        console.clear();
        return;
    }
    const data = await response.json();
    // updating data according to the comming response
    document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector('.city').innerHTML = `${data.name}`;
    document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;
    document.querySelector('.wind').innerHTML = `${data.wind.speed} Km/h`;
    // updating weather image according to weather conditions
    document.querySelector('.weather-icon').src = `images/${data.weather[0].main.toLowerCase()}.png`;
}

updateWeatherData();

searchBtn.addEventListener('click', () => {
    let city = searchBox.value.trim().toLowerCase();
    if (city !== '') {
        updateWeatherData(city);
    }
    else {
        errorMsg.classList.add('active');
        setTimeout(() => {
            errorMsg.classList.remove('active');
        }, 2500);
    }
    searchBox.value = '';
});

searchBox.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') searchBtn.click();
});
