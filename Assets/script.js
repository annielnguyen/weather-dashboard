// //variables
// let searchButton = $(".searchButton");
let city = $("#city")[0];
const API_KEY = "7d89c17a841147df895c4168b3b4dd3d";
// let name = $(".name")[0];
// let temp = $(".temp")[0];
// let wind = $(".wind")[0];
// let humidity = $(".humidity")[0];
// let UVIndex = $(".uvIndex")[0];
// let dateToday= $(".today")[0];

// //add an event listener
// $(".searchButton").click(function () {
//   //construct a Querry URL to make API call
//   var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" +
//     city.value +
//     "&appid=" +
//     APIKey;

//   //make API call using fetch
//   fetch(queryURL)

//   let lat =document.getElementById('latitude').value;
//   let lon =document.getElementById('longitude').value;
//   let units= 'imperial';

// .then((argument) => argument.json())
//     .then((data) => {
//       let nameValue = data["name"];
//       //convert Kelvin into Farenheit//
//       let tempValue = ((parseInt(data["main"]["temp"]) - 273.15) * 9) / 5 + 32;
//       let windValue = data["wind"]["speed"];
//       let humidityValue = data["main"]["humidity"];
//       console.log(nameValue);
//       name.innerText = nameValue;
//       temp.innerText = Math.round(tempValue.toString());
//       wind.innerText = windValue;
//       humidity.innerText = humidityValue;
//     })
//     .catch((err) => alert("Please enter a valid city name"));
// });

function cityInfo() {
  getCoord();
}
//

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
      //getting temp, wind, and humidity for five day forecast//

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

      console.log(data);
      updpateCards(data["daily"], uv);
    });
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

for (i = 0; i < 6; i++) {
  document.getElementById("day" + (i + 1).toString()).innerHTML =
    weekday[displayDay(i)];
}
