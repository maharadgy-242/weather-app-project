function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElemnt = document.querySelector("#forecast");
  let days = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  let forecastHtml = `<div class = "row">`;

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
              <div class="col-2" id="forecast-block">
                <div class="weather-forecast-days">${day}</div>
                <img
                  src="https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png"
                  alt=""
                  id="weather-forecast-days-image"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">14</span>
                  <span class="weather-forecast-temperature-min">9</span>
                </div>
              </div>`;
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElemnt.innerHTML = forecastHtml;
}

function getDaysForecast(coordinates) {
  let apiKey = "cd173a006b0e51dac58c6d8064c94178";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperatire(response) {
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let feelLikeElement = document.querySelector("#feels-like");
  feelLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = Math.round(response.data.main.temp);

  getDaysForecast(response.data.coord);
}

function search(city) {
  let apiKey = "6db09e02ab36d020dda52839a3960ba8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperatire);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let FahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(FahrenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celsiusTemp;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiustLink = document.querySelector("#celsius-link");
celsiustLink.addEventListener("click", showCelsiusTemp);

search("Milan");
