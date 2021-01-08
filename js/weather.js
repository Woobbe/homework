const inputAutocomplete = document.querySelector('#header__city');
const btnGetWeather = document.querySelector('#btn-weather');
var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(48.465956859420714, 35.05531639199907));

var options = {
    bounds: defaultBounds,
    types: ['(regions)']
};

autocomplete = new google.maps.places.Autocomplete(inputAutocomplete, options);

function getWeather(city) {
    const xhr = new XMLHttpRequest();
    const API = 'b377d9cbd56af7e579dc8c36dc4186fa';
    const language = 'ru';
    const weatherCity = city || getCityLocalStorage() || 'Dnipro';
    xhr.open('GET',
        `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&appid=${API}&lang=${language}&units=metric`,
        true);
    xhr.send();

    xhr.onload = () => {
        if (xhr.status !== 200) {
            cleanWeatherWrapper();
            showWeatherError('Выберите вариант из списка');
            return;
        }
        const weather = JSON.parse(xhr.response);
        const type = weather.weather[0].description;
        const temperature = weather.main.temp;
        const iconLink = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
        const city = weather.name;

        showWeather(type, temperature, iconLink, city);
    }

    xhr.onerror = () => {
        showWeatherError('Сервис временно недоступен!');
    }
}

function showWeather(type, temperature, iconLink, city) {
    const wrapper = document.querySelector('.header__weather');
    const icon = document.createElement('img');
    const weatherType = document.createElement('p');
    const weatherTemperature = document.createElement('p');
    const weatherCity = document.createElement('p');

    cleanWeatherWrapper();

    icon.src = iconLink;
    icon.alt = 'weather';
    weatherType.textContent = `${type[0].toUpperCase()}${type.slice(1)} `;
    weatherTemperature.textContent = `Температура: ${Math.round(temperature)}°`;
    weatherCity.textContent = city;
    wrapper.append(weatherCity);
    wrapper.append(weatherType);
    wrapper.append(weatherTemperature);
    wrapper.append(icon);
}

function getAutocompeteCity(inputSelector) {
    const input = document.querySelector(inputSelector);
    const inputValue = input.value;

    if (!inputValue) {
        alert('Поле не может быть пустым!');
        return 'Dnipro';
    }

    const indexSeparator = inputValue.indexOf(',');
    const city = inputValue.slice(0, indexSeparator);

    setCityLocalStorage(city);
    return city;
}

const setCityLocalStorage = city => window.localStorage.setItem('weatherCity', city);

const getCityLocalStorage = () => window.localStorage.getItem('weatherCity');

function showWeatherError(text) {
    const wrapper = document.querySelector('.header__weather');
    const errorText = document.createElement('p');
    errorText.textContent = text;
    wrapper.append(errorText);
}

function cleanWeatherWrapper() {
    const wrapper = document.querySelector('.header__weather');
    const wrapperContent = wrapper.querySelectorAll('*');
    wrapperContent.forEach(element => {
        if (element) {
            element.remove();
        }
    });
}

btnGetWeather.addEventListener('click', () => {
    getWeather(getAutocompeteCity('#header__city'));
})

getWeather();

