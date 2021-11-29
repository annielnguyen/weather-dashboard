//variables
let searchButton = $(".searchButton");
let city = $(".city")[0];
let name = $(".name")[0];
let temp = $(".temp")[0];
let wind = $(".wind")[0];
let humidity = $(".humidity")[0];

//create a variable to store API Key
let APIKey = "b06778404ac2a8398a7b15d5a4bb31e5";

//add an event listener
$(".searchButton").click(function () {
  //construct a Querry URL to make API call
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city.value +
    "&appid=" +
    APIKey;

  //make API call using fetch
  fetch(queryURL)
    .then((argument) => argument.json())
    .then((data) => {
      let nameValue = data["name"];
      //convert Kelvin into Farenheit
      let tempValue = ((parseInt(data["main"]["temp"]) - 273.15) * 9) / 5 + 32;
      let windValue = data["wind"]["speed"];
      let humidityValue = data["main"]["humidity"];
      console.log(nameValue);
      name.innerText = nameValue;
      temp.innerText = Math.round(tempValue.toString());
      wind.innerText = windValue;
      humidity.innerText = humidityValue;
    })
    .catch((err) => alert("Please enter a valid city name"));
});

//clear calendar button (reset)
// function clearSearch() {
//   localStorage.clear();
//   location.reload();
// }

// $(".clearsearch").on("click", clearSearch);
