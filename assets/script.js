const searchBarEl = document.getElementById(`search-bar`);
const submitBtnEl = document.getElementById(`submit-button`);
let searchHistory = JSON.parse(localStorage.getItem(`searches`)) || [];
let cityNameUrl;
// My Weather API key --- 26fdb0f1c088de04bafa78b85c21be83

function handleSearchSubmit(event) {
  //make an if statement for if the user doesn't input a valid city name
  event.preventDefault();

  const citySearch = searchBarEl.value;

  searchHistory.push(citySearch);

  localStorage.setItem(`searches`, JSON.stringify(searchHistory));

  cityNameUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchBarEl.value}&limit=1&appid=3425d908dbea20e1649805cca8ffecfb`;

  fetchCurrentWeather();
  fetchWeatherForecast();
  createPreviousSearches();
}

function fetchWeatherForecast() {
  fetch(cityNameUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const cityForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=3425d908dbea20e1649805cca8ffecfb&units=imperial`;
      return fetch(cityForecastUrl);
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //loop through the LIST within this data and pull ONLY the first 5 dt_txt that INCLUDE 12:00:00
      //pass this data to the handleForecastCardPopulation function
      populateForecastCards(data);
    });
}
//create a new function using the exact same fetch as above but make it for weather instead of forecast.
function fetchCurrentWeather() {
  fetch(cityNameUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const cityWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=3425d908dbea20e1649805cca8ffecfb&units=imperial`;
      return fetch(cityWeatherUrl);
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //loop through the LIST within this data and pull ONLY the first 5 dt_txt that INCLUDE 12:00:00
      //pass this data to the handleForecastCardPopulation function
      populateCurrentWeather(data);
    });
}
function populateCurrentWeather(data) {
  const cityDetails = document.getElementById(`city-details`);
  const tempValue = document.getElementById(`temp-value`);
  const windValue = document.getElementById(`wind-value`);
  const humidValue = document.getElementById(`humidity-value`);

  cityDetails.textContent = data.name + " " + dayjs().format("MM/DD/YYYY");
  tempValue.textContent = data.main.temp;
  windValue.textContent = data.wind.speed;
  humidValue.textContent = data.main.humidity;
}

function populateForecastCards(data) {
  for (let i = 0; i < data.list.length; i++) {
    if (data.list[i].dt_txt.includes(`12:00:00`)) {
      const forecastContainerEl = document.getElementById(`forecast-container`);
      const forecastCardParentEl = document.createElement(`div`);
      const forecastCardBodyEl = document.createElement(`div`);
      const forecastCardDateEl = document.createElement(`h5`);
      const forecastCardIconEl = document.createElement(`h6`);
      const forecastCardTempEl = document.createElement(`p`);
      const forecastCardWindEl = document.createElement(`p`);
      const forecastCardHumidEl = document.createElement(`p`);

      forecastCardParentEl.classList.add("card", "five-day-box", "m-auto");
      forecastCardParentEl.style.width = `15rem`;
      forecastCardParentEl.style.height = `20rem`;
      forecastCardBodyEl.classList.add(`card-body`);
      forecastCardDateEl.classList.add("card-title", "pt-2", "pb-3");
      forecastCardIconEl.classList.add(
        "card-subtitle",
        "mb-2",
        "text-muted",
        "weather-icon",
        "p-3"
      );
      forecastCardTempEl.classList.add("card-text", "py-2");
      forecastCardWindEl.classList.add("card-text", "py-2");
      forecastCardHumidEl.classList.add("card-text", "py-2");

      // let dailyWeather = data.list[i];

      forecastCardDateEl.textContent = data.list[i].dt_txt;
      forecastCardTempEl.textContent = `Temp: ` + data.list[i].main.temp + `F`;
      forecastCardWindEl.textContent =
        `Wind: ` + data.list[i].wind.speed + `MPH`;
      forecastCardHumidEl.textContent =
        `Humidity: ` + data.list[i].main.humidity + `%`;

      forecastCardBodyEl.appendChild(forecastCardDateEl);
      forecastCardBodyEl.appendChild(forecastCardIconEl);
      forecastCardBodyEl.appendChild(forecastCardTempEl);
      forecastCardBodyEl.appendChild(forecastCardWindEl);
      forecastCardBodyEl.appendChild(forecastCardHumidEl);
      forecastCardParentEl.appendChild(forecastCardBodyEl);
      forecastContainerEl.appendChild(forecastCardParentEl);
    }
  }
}

function createPreviousSearches() {
  for (let i = 0; i < searchHistory.length; i++) {
    let searchArray = [];
    const previousSearchContainer = document.getElementById(
      `previous-search-container`
    );
    const searchButtonEl = document.createElement(`button`);
    searchButtonEl.style.width = `100%`;
    searchButtonEl.style.height = `auto`;

    searchButtonEl.textContent = searchHistory[i];
    previousSearchContainer.appendChild(searchButtonEl);
  }
}
createPreviousSearches();
submitBtnEl.addEventListener(`click`, handleSearchSubmit);
