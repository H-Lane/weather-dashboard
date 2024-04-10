const searchBarEl = document.getElementById(`search-bar`);
const submitBtnEl = document.getElementById(`submit-button`);
let searchHistory = JSON.parse(localStorage.getItem(`searches`)) || [];
console.log(searchBarEl);
console.log(submitBtnEl);

function handleSearchSubmit(event) {
  //make an if statement for if the user doesn't input a valid city name
  event.preventDefault();

  const citySearch = {
    city: searchBarEl.value,
  };

  searchHistory.push(citySearch);

  localStorage.setItem(`searches`, JSON.stringify(searchHistory));

  console.log(searchHistory);
}

submitBtnEl.addEventListener(`click`, handleSearchSubmit);
