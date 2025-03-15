const clearConditions = [
  1000 // "Sunny" / "Clear"
];

const cloudyConditions = [
  1003, // "Partly Cloudy"
  1006, // "Cloudy"
  1009, // "Overcast"
  1030, // "Mist"
  1135, // "Fog"
  1147, // "Freezing fog"
];

const rainConditions = [
  1063, // "Patchy rain nearby"
  1150, // "Patchy light drizzle"
  1153, // "Light drizzle"
  1168, // "Freezing drizzle"
  1171, // "Heavy freezing drizzle"
  1180, // "Patchy light rain"
  1183, // "Light rain"
  1186, // "Moderate rain at times"
  1189, // "Moderate rain"
  1192, // "Heavy rain at times"
  1195, // "Heavy rain"
  1198, // "Light freezing rain"
  1201, // "Moderate or heavy freezing rain"
  1240, // "Light rain shower"
  1243, // "Moderate or heavy rain shower"
  1246 // "Torrential rain shower"
];

const thunderConditions = [
  1087, // "Thundery outbreaks in nearby"
  1273, // "Patchy light rain in area with thunder"
  1276, // "Moderate or heavy rain in area with thunder"
  1279, // "Patchy light snow in area with thunder"
  1282 // "Moderate or heavy snow in area with thunder"
];

const snowConditions = [
  1066, // "Patchy snow nearby"
  1069, // "Patchy sleet nearby"
  1072, // "Patchy freezing drizzle nearby"
  1114, // "Blowing snow"
  1117, // "Blizzard"
  1204, // "Light sleet"
  1207, // "Moderate or heavy sleet"
  1210, // "Patchy light snow"
  1213, // "Light snow"
  1216, // "Patchy moderate snow"
  1219, // "Moderate snow"
  1222, // "Patchy heavy snow"
  1225, // "Heavy snow"
  1237, // "Ice pellets"
  1249, // "Light sleet showers"
  1252, // "Moderate or heavy sleet showers"
  1255, // "Light snow showers"
  1258, // "Moderate or heavy snow showers"
  1261, // "Light showers of ice pellets"
  1264 // "Moderate or heavy showers of ice pellets"
];

const body = document.querySelector('body');

const locationinput = document.querySelector('#locationInput');
const searchButton = document.querySelector('#searchButton');

const userLocation = document.querySelector('.location');
const temperature = document.querySelector('.temperature');
const weatherDate = document.querySelector('.date');
const weatherDescription = document.querySelector('.description');
const forecastTypeRadios = document.getElementsByName('forecastType');

const forecastContainer = document.querySelector('.forecast');

forecastTypeRadios[0].checked = true;
let selectedType = 'daily';

for (radio of forecastTypeRadios) {
  radio.addEventListener('change', () => {

    for (const radio of forecastTypeRadios) {
      if (radio.checked) {
        selectedType = radio.value;
        console.log(selectedType);
        break;
      }
    }

  })
}

function getWeather(days, location) {
  axios.get("http://api.weatherapi.com/v1/forecast.json", {
    params: {
      key: "34d04e668a2c43918c6135917251503",
      q: location,
      lang: 'ru',
      days: days
    }
  }).then((response) => {
    console.log(response.data);
    const conditionCode = response.data.current.condition.code;

    if (clearConditions.includes(conditionCode)) {
      body.setAttribute('weatherstate', 'clear');
    }
    else if (cloudyConditions.includes(conditionCode)) {
      body.setAttribute('weatherstate', 'cloudy');
    }
    else if (rainConditions.includes(conditionCode)) {
      body.setAttribute('weatherstate', 'rain');
    }
    else if (thunderConditions.includes(conditionCode)) {
      body.setAttribute('weatherstate', 'thunder');
    }
    else if (snowConditions.includes(conditionCode)) {
      body.setAttribute('weatherstate', 'snow');
    }


    if (days == 3) {
      for(let i = 0; i<3; i++){
        let currentDate = response.data.forecast.forecastday[i].date;
        let currentTemperature = response.data.forecast.forecastday[i].day.avgtemp_c;
        let currentDescription = response.data.forecast.forecastday[i].day.condition.text;
        let currentIcon = response.data.forecast.forecastday[i].day.condition.icon;

        let weatherInfo = document.createElement('div');
        weatherInfo.classList.add('weather-info');
        weatherInfo.innerHTML = `
          <h2 class="location">${response.data.location.name}</h2>
          <p class="date">${currentDate}</p>
          <p class="temperature">${currentTemperature}°C</p>
          <p class="description">${currentDescription}</p>
          <img src="${currentIcon}" alt="${currentDescription}" class="icon">
        `
        forecastContainer.appendChild(weatherInfo);
      }
    }
    else {
      for(let i=0; i<24; i++){
        let currentDate = response.data.forecast.forecastday[0].hour[i].time;
        let currentTemperature = response.data.forecast.forecastday[0].hour[i].temp_c;
        let currentDescription = response.data.forecast.forecastday[0].hour[i].condition.text;
        let currentIcon = response.data.forecast.forecastday[0].hour[i].condition.icon;
        let weatherInfo = document.createElement('div');
        weatherInfo.classList.add('weather-info');
        weatherInfo.innerHTML = `
          <h2 class="location">${response.data.location.name}</h2>
          <p class="date">${currentDate}</p>
          <p class="temperature">${currentTemperature}°C</p>
          <p class="description">${currentDescription}</p>
          <img src="${currentIcon}" alt="${currentDescription}" class="icon">
        `
        forecastContainer.appendChild(weatherInfo);
      }
    }
  })
    .catch((error) => {
      alert('Город не найден');
    })
}



searchButton.addEventListener('click', () => {
  forecastContainer.innerHTML = '';
  if (locationinput.value && selectedType == 'daily') {
    console.log(locationinput.value);
    getWeather(3, locationinput.value);
  }
  else if (locationinput.value && selectedType == 'hourly') {
    getWeather(1, locationinput.value);
  }
  else {
    alert('Не оставляйте поле пустым');
  }
})