const $ = document;

let APIKey = '3df6a8fa2266e5f86777d95e734275a7';

const searchBox = $.querySelector('.search-box');
const cityElem = $.querySelector('.city');
const dateElem = $.querySelector('.date');
const tempElem = $.querySelector('.temp');
const weatherElem = $.querySelector('.weather');
const hiLowElem = $.querySelector('.hi-low');

function fetchWeather() {
    let searchCity = searchBox.value;
    searchBox.value = '';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${APIKey}`)
        .then(res => res.json())
        .then(data => {
            const searchCity = data.name;
            const date = getDate();
            const temp = `${Math.round(data.main.temp_max - 273.15)}°c`;
            const weatherStation = data.weather[0].main;
            const high = `${Math.round(data.main.temp_max - 273.15)}°c`;
            const low = `${Math.round(data.main.temp_min - 273.15)}°c`;
            const highLow = `${low} / ${high}`

            console.log(data);

            showData(searchCity, date, temp, weatherStation, highLow);
        });
}

function getDate() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const date = new Date();

    const weekName = days[date.getDay()];
    const monthDay = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    const stringDate = `${weekName} ${monthDay} ${monthName} ${year}`;

    return stringDate;
}

function showData(searchCity, stringDate, temp, weatherStation, highLow) {
    cityElem.innerHTML = searchCity;
    dateElem.innerHTML = stringDate;
    tempElem.innerHTML = temp;
    weatherElem.innerHTML = weatherStation;
    hiLowElem.innerHTML = highLow;
}

searchBox.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        fetchWeather();
    }
});




