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

  //   getWeatherDataApi()
  submitCityNameApiRequest();
}

function submitCityNameApiRequest() {
  const cityNameUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchBarEl.value}&limit=1&appid=26fdb0f1c088de04bafa78b85c21be83`;

  return fetch(cityNameUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.length; i++) {
        // const lat = data[i].lat;
        // const lon = data[i].lon;
        cityArray.push(data[i]);
      }
    });
}

// async function getWeatherDataApi() {
//     let cityCoords = await submitCityNameApiRequest();
//     console.log(cityCoords);
// }

function handleForecastPopulation(data) {}

function handleCurrentWeather(data) {}

submitBtnEl.addEventListener(`click`, handleSearchSubmit);
