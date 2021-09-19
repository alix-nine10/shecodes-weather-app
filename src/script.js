function showDateTime() {
  let h5 = document.querySelector("#date-heading");
  let today = new Date();

  let hour = today.getHours();
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];

  h5.innerHTML = `${day} ${hour}:${minutes}`;
}

showDateTime();

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let forecastDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return forecastDays[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let weatherForecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    let tempHighRounded = Math.round(forecastDay.temp.max);
    let tempLowRounded = Math.round(forecastDay.temp.min);
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col forecast-days-column">
        <img
          id="forecast-icon"
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
        />
        <h6 class="forecast-day-title" id="forecast-day">${formatDate(
          forecastDay.dt
        )}</h6>
        <h3 id="forecast-high-low-temp">
          <strong><span id="forecast-temp-high">${tempHighRounded}°</span></strong> |
          <span id="forecast-main-low">${tempLowRounded}°</span>
        </h3>
      </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  weatherForecast.innerHTML = forecastHTML;
}

function getForecast(coord) {
  let apiKey = "4c4c2b7230f2b0c08d2e63af702d9fec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showSearch(response) {
  let cityHeading = document.querySelector("#todays-weather-city-name");
  let tempRounded = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#todays-temp");
  let descriptionHeading = document.querySelector("#todays-weather-type-name");
  let windSpeed = document.querySelector("#todays-weather-windspeed");
  let windSpeedKms = Math.round(response.data.wind.speed * 3.6);
  let tempHigh = document.querySelector("#todays-temp-high");
  let tempLow = document.querySelector("#todays-temp-low");
  let tempHighRounded = Math.round(response.data.main.temp_max);
  let tempLowRounded = Math.round(response.data.main.temp_min);
  let weatherIcon = document.querySelector("#weather-icon");

  celsiusTemp = response.data.main.temp;

  tempElement.innerHTML = `${tempRounded}°C`;
  tempHigh.innerHTML = `${tempHighRounded}°`;
  tempLow.innerHTML = `${tempLowRounded}°`;
  descriptionHeading.innerHTML = response.data.weather[0].main;
  cityHeading.innerHTML = response.data.name;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  windSpeed.innerHTML = `${windSpeedKms}km/hour`;
  console.log(response.data);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "4c4c2b7230f2b0c08d2e63af702d9fec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showSearch);
}

function defaultSubmit(event) {
  event.preventDefault();
  let searchForm = document.querySelector("#search-form-input");
  search(searchForm.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#todays-temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let fTempRounded = Math.round(fahrenheitTemp);
  tempElement.innerHTML = `${fTempRounded}°F`;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#todays-temp");

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let cTempRounded = Math.round(celsiusTemp);
  tempElement.innerHTML = `${cTempRounded}°C`;
}

let celsiusTemp = null;

let weatherForm = document.querySelector("#search-form");
weatherForm.addEventListener("submit", defaultSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Vancouver");
