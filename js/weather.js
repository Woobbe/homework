var inputAutocomplete = document.querySelector('#header__city');
var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(48.465956859420714, 35.05531639199907));

var options = {
    bounds: defaultBounds,
    types: ['(regions)']
};

autocomplete = new google.maps.places.Autocomplete(inputAutocomplete, options);

function getWeather() {
    let xhr = new XMLHttpRequest();
    const API = 'b377d9cbd56af7e579dc8c36dc4186fa';
    const lat = '48.465956859420714';
    const lon = '35.05531639199907';
    const language = 'ru';
    xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&lang=${language}&units=metric`, true);
    xhr.send();

    xhr.onload = () => {
        const weather = JSON.parse(xhr.response);
        const type = weather.weather[0].description;
        const temperature = weather.main.temp;
        const iconLink = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
        const city = weather.name;

        showWeather(type, temperature, iconLink, city)
    }

    xhr.onerror = () => {
        const wrapper = document.querySelector('.header__weather');
        const errorText = document.createElement('p');
        errorText.textContent = 'Сервис временно недоступен!';
        wrapper.append(errorText);
    }
}

function showWeather(type, temperature, iconLink, city) {
    const wrapper = document.querySelector('.header__weather');
    const icon = document.createElement('img');
    const weatherType = document.createElement('p');
    const weatherTemperature = document.createElement('p');
    const weatherCity = document.createElement('p');
    icon.src = iconLink;
    icon.alt = 'weather';
    weatherType.textContent = `${type[0].toUpperCase()}${type.slice(1)} `;
    weatherTemperature.textContent = `Температура: ${Math.round(temperature)}`;
    weatherCity.textContent = city;
    wrapper.append(weatherCity);
    wrapper.append(weatherType);
    wrapper.append(weatherTemperature);
    wrapper.append(icon);
}

getWeather()