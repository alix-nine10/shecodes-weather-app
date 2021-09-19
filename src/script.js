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

function displayForecast(response) {
  let weatherForecast = document.querySelector("#forecast");
  console.log(response.data);
  let forecastHTML = `<div class="row">`;
  let forecastDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  forecastDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col forecast-days-column">
        <img
          id="forecast-icon"
          src="http://openweathermap.org/img/wn/04d@2x.png"
        />
        <h6 class="forecast-day-title" id="forecast-day">${day}</h6>
        <h3 class="forecast-temp" id="forecast-main-temp">23°</h3>
        <p id="forecast-high-low-temp">
          <strong><span id="forecast-temp-high">25°</span></strong> |
          <span id="forecast-main-low">12°</span>
        </p>
      </div>
    `;
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
  tempHigh = console.log(response);
  cityHeading.innerHTML = response.data.name;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

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
