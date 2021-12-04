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
  getWeather();
}
//

function updpateCards(temp, wind_speed, humidity, uvi) {
  let cards = document.querySelectorAll(".card-body.temp");
  for (let i = 0; i < cards.length; ++i) {
    cards[i].innerText = temp;
    cards[i].innerText = wind_speed;
    cards[i].innerText = humidity;
    cards[i].innerText = icon;
    cards[i].innerText = uvi;
  }
}
function getWeather() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city.value +
      "&appid=" +
      API_KEY
  )
    .then((response) => response.json())
    .then((data) => {
      //getting temp, wind, and humidity for five day forecast//

      getUV(
        data["coord"]["lat"],
        data["coord"]["lon"],
        data["main"]["temp"],
        data["wind"]["speed"],
        data["main"]["humidity"],
        data["weather"]["icon"]
      );
    });
}

function getUV(lat, long, temp, wind_speed, humidity, icon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      API_KEY
  )
    .then((response) => response.json())
    .then((data) => {
      let uv = data["current"]["uvi"];
      updpateCards(temp, wind_speed, humidity, icon, uv);
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

for (i = 0; i < 5; i++) {
  document.getElementById("day" + (i + 1).toString()).innerHTML =
    weekday[displayDay(i)];
}
