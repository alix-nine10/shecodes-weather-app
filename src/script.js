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

let weatherForm = document.querySelector("#search-form");
weatherForm.addEventListener("submit", defaultSubmit);

search("Vancouver");
