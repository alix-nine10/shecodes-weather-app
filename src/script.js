function showSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityHeading = document.querySelector("#todays-weather-city-name");

  cityHeading.innerHTML = `${searchInput.value}`;
  let apiKey = "4c4c2b7230f2b0c08d2e63af702d9fec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showSearch);

function showTemp(response) {
  console.log(response.data.main.temp);
  let tempRounded = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#todays-weather-temp");
  tempElement.innerHTML = `${tempRounded}°C`;
}

function showDateTime() {
  let h5 = document.querySelector("#date-heading");
  let today = new Date();

  let hour = today.getHours();
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[today.getDay()];

  h5.innerHTML = `${day} ${hour}:${minutes}`;
}

showDateTime();
