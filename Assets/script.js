// //variables
// let searchButton = $(".searchButton");
let city = $("#city")[0];
const API_KEY = "7d89c17a841147df895c4168b3b4dd3d";
let prevSearches = $(".prev-searches")[0];
function cityInfo() {
  getCoord();
}

function getPrevSearch(event) {
  let weather = JSON.parse(localStorage.getItem("weather"));
  let city = event.target.innerText;
  updpateCards(weather["daily"], weather["uv"]);
}

//get search history from local storage

console.log(JSON.parse(localStorage.getItem("weather")));

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
      let storage = localStorage.getItem("weather");
      storage[city.value] = {
        daily: data["daily"],
        uv: uv,
      };
      localStorage.setItem("weather", storage);
      let button = document.createElement("button");
      button.innerText = city.value;
      button.addEventListener("click", getPrevSearch);
      prevSearches.appendChild(button);

      updpateCards(data["daily"], uv);
    });
}
//display time and date

for (let i = 0; i < 6; ++i) {
  let now = moment().add(i, "days").format("MM/DD/YYYY");
  $("#day" + (i + 1).toString()).text(now);
}
// setInterval(() => {
//   now = moment().format("MMM Do, YYYY, h:mm A");
//   $("#day1").text(now);
// }, 60000);

// var today = new Date();

// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

// var dateTime = date+' '+time;

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

// for (i = 0; i < 6; i++) {
//   document.getElementById("day" + (i + 1).toString()).innerHTML =
//     weekday[displayDay(i)];
// }
