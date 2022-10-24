function displayTemperatire(response) {
  console.log(response.data);
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
}

let apiKey = "6db09e02ab36d020dda52839a3960ba8";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperatire);
