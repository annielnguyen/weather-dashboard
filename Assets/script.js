window.onload = (event) => {
  refreshPage();
};
//variables
let city = $("#city")[0];
const API_KEY = "7d89c17a841147df895c4168b3b4dd3d";
let prevSearches = $(".prev-searches")[0];
function cityInfo() {
  getCoord();
}

function refreshPage() {
  let storage = localStorage.getItem("weather");

  if (storage == null) {
    return;
  } else {
    storage = JSON.parse(storage);
    let entries = Object.entries(storage);
    for (let i = 0; i < entries.length; ++i) {
      console.log(entries);
      addPrevSearchElement(entries[i][0]);
    }
  }
}
console.log(JSON.parse(localStorage.getItem("weather")));

//function for storing previous searches
function getPrevSearch(event) {
  let weather = JSON.parse(localStorage.getItem("weather"));
  let name = event.target.innerText;
  updpateCards(weather[name]["daily"], weather[name]["uv"]);
}

//displaying weather info for each card

function updpateCards(daily, uvi) {
  let temp_cards = document.querySelectorAll(".temp");
  let wind_cards = document.querySelectorAll(".wind");
  let humidity_cards = document.querySelectorAll(".humidity");
  let icon_images = document.querySelectorAll(".current-weatherimg");
  let uv_card = document.querySelector(".uv");
  let url =
    "http://openweathermap.org/img/wn/" +
    daily[0]["weather"][0]["icon"] +
    "@2x.png";
  uv_card.innerText = "UV: " + uvi;
  if (uvi < 3) {
    uv_card.style.backgroundColor = "green";
  } else if (uvi <= 5) {
    uv_card.style.backgroundColor = "yellow";
  } else {
    uv_card.style.backgroundColor = "orange";
  }
  temp_cards[0].innerText = "Temp: " + daily[0]["temp"]["day"] + "°F";
  wind_cards[0].innerText = "Wind: " + daily[0]["wind_speed"] + " MPH";
  humidity_cards[0].innerText = "Humidity: " + daily[0]["humidity"] + "%";
  icon_images[0].setAttribute("src", url);
  for (let i = 0; i < temp_cards.length - 1; ++i) {
    url =
      "http://openweathermap.org/img/wn/" +
      daily[i + 1]["weather"][0]["icon"] +
      "@2x.png";
    temp_cards[i + 1].innerText = "Temp: " + daily[i]["temp"]["day"] + "°F";
    humidity_cards[i + 1].innerText =
      "Humidity: " + daily[i]["humidity"] + " %";
    wind_cards[i + 1].innerText = "Wind: " + daily[i]["wind_speed"] + " MPH";
    icon_images[i + 1].setAttribute("src", url);
  }
}
//Getting coordinates
function getCoord() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city.value +
      "&appid=" +
      API_KEY
  )
    .then((response) => response.json())
    .then((data) => {
      getUV(data["coord"]["lat"], data["coord"]["lon"]);
    });
}

//get UVI
function getUV(lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial" +
      "&appid=" +
      API_KEY
  )
    .then((response) => response.json())
    .then((data) => {
      let uv = data["current"]["uvi"];
      let storage = JSON.parse(localStorage.getItem("weather"));
      if (storage == null) {
        let name = city.value;
        let item = {};
        item[name] = {
          daily: data["daily"],
          uv: uv,
        };
        console.log(item);

        localStorage.setItem("weather", JSON.stringify(item));
      } else {
        storage[city.value] = {
          daily: data["daily"],
          uv: uv,
        };
        localStorage.setItem("weather", JSON.stringify(storage));
      }
      addPrevSearchElement(city.value);
      updpateCards(data["daily"], uv);
    });
}
function addPrevSearchElement(name) {
  let button = document.createElement("button");
  button.innerText = name;
  button.addEventListener("click", getPrevSearch);
  prevSearches.appendChild(button);
}

//display time and date

for (let i = 0; i < 6; ++i) {
  let now = moment().add(i, "days").format("MM/DD/YYYY");
  $("#day" + (i + 1).toString()).text(now);
}

//Display day of week for forecast
var d = new Date();
var weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//getting the day
function displayDay(day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}
