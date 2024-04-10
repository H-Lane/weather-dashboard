const searchBarEl = document.getElementById(`search-bar`);
const submitBtnEl = document.getElementById(`submit-button`);
let searchHistory = JSON.parse(localStorage.getItem(`searches`)) || [];
let cityArray = [];

// My Weather API key --- 26fdb0f1c088de04bafa78b85c21be83

function handleSearchSubmit(event) {
  //make an if statement for if the user doesn't input a valid city name
  event.preventDefault();

  const citySearch = {
    city: searchBarEl.value,
  };

  searchHistory.push(citySearch);

  localStorage.setItem(`searches`, JSON.stringify(searchHistory));

  submitCityNameApiRequest();
//   fetchWeatherDataApi();
}

function submitCityNameApiRequest() {
  const cityNameUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchBarEl.value}&limit=1&appid=26fdb0f1c088de04bafa78b85c21be83`;

  return fetch(cityNameUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.length; i++) {
        cityArray.push(data[i]);
        console.log(cityArray)
      }
    });
}

async function fetchWeatherDataApi() {
  await submitCityNameApiRequest();
  let cityLat = cityArray[0].lat;
  let cityLon = cityArray[0].lon;
  const cityWeatherUrl = `api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=26fdb0f1c088de04bafa78b85c21be83`

  fetch(cityWeatherUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
  })

  cityArray.length = 0;
}

function handleForecastPopulation(data) {}

function handleCurrentWeather(data) {}

submitBtnEl.addEventListener(`click`, handleSearchSubmit);
