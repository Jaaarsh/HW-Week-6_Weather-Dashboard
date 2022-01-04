//Code for the current date to be displayed
let time = moment().format("M/D/YYYY");
let day1_time = moment().add(1, 'days',).format("M/D/YYYY");
let day2_time = moment().add(2, 'days',).format("M/D/YYYY");
let day3_time = moment().add(3, 'days',).format("M/D/YYYY");
let day4_time = moment().add(4, 'days',).format("M/D/YYYY");
let day5_time = moment().add(5, 'days',).format("M/D/YYYY");

//weather icons
let cloud = '☁️';
let sunny = '☀️';
let rain = '🌧';
let snow = '🌨️';

//API CODE TO GET DATA
let searchBtnEl = document.getElementById('searchBtn');


function searchFetch() {
    let cityname = document.getElementById('citySearch').value;
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityname+',&units=imperial&appid=20347a25b798ad0bb2e633edc661fefd')
    .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("ERROR");
        }
      })
      .then(data => {
        console.log(data);
        displayWeather(data);
      })
      .catch((error) => console.error("FETCH ERROR:", error));

    //5-Day Fetch
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+cityname+',&units=imperial&appid=20347a25b798ad0bb2e633edc661fefd')
    .then((response_day) => {
        if (response_day.ok) {
          return response_day.json();
        } else {
          throw new Error("ERROR");
        }
      })
      .then(results => {
        console.log(results);
        displayDayWeather(results);
      })
      .catch((error) => console.error("FETCH ERROR:", error));
    
};

let card = document.getElementsByClassName("card");

searchBtnEl.addEventListener('click', searchFetch);



//DATA FROM API
function displayWeather(data) {
  
  document.getElementById("card1").hidden = false;
  document.getElementById("card2").hidden = false;
  document.getElementById("card3").hidden = false;
  document.getElementById("card4").hidden = false;
  document.getElementById("card5").hidden = false;

  const city = data.name;
  const temp = data.main.temp;
  const wind = data.wind.speed;
  const humid = data.main.humidity;
  let lat = data.coord.lat;
  let lon = data.coord.lon;
  
  //UV Index Fetch (scrapped)
  //fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=imperial&appid=20347a25b798ad0bb2e633edc661fefd')
  //.then((response_uv) => {
  //  if (response_uv.ok) {
  //    return response_uv.json();
    
  //  } else {
  //    throw new Error("ERROR");
  //  }
  //})
  //.then(dataResults => {
  //  console.log(dataResults);
  // displayWeather(dataResults);
  //})
  //.catch((error) => console.error("FETCH ERROR:", error));

  if (data.weather[0].main = "Clouds") {
    icon = cloud;
  } else if (data.weather[0].main = "Clear") {
    icon = sunny;
  } else if (data.weather[0].main = "Rain") {
    icon = rain;
  }  else if (data.weather[0].main = "Mist") {
      icon = rain;
  } else if (data.weather[0].main = "Snow") {
    icon = snow;
  };

  //const uv = data.daily[0].uvi

  const weatherDiv = document.getElementById("weather");
  const weatherData = document.createElement("ul");
  weatherDiv.appendChild(weatherData);
  //data for city name and call for date
  let listCity = document.createElement("h1");
  listCity.innerHTML = city + " (" + time +") " + icon;
  weatherData.appendChild(listCity);
  //data for temperature
  let listTemp = document.createElement("li");
  listTemp.innerHTML = "Temp: " + temp +" Fahrenheit";
  weatherData.appendChild(listTemp);
  let br = document.createElement("br");
  weatherData.appendChild(br); 
  //data for wind speed
  listWind = document.createElement("li");
  listWind.innerHTML = "Wind: " + wind +" MPH";
  weatherData.appendChild(listWind);
  let br2 = document.createElement("br");
  weatherData.appendChild(br2); 
  //data for humidity
  listHumidity = document.createElement("li");
  listHumidity.innerHTML = "Humidity: " + humid +"% Humidity";
  weatherData.appendChild(listHumidity);
  let br3 = document.createElement("br");
  weatherData.appendChild(br3); 
  //data for uv index
  listUv = document.createElement("li");
  //listUv.innerHTML = uv;
  weatherData.appendChild(listUv);

}

//5-Day Weather Data from API
function displayDayWeather(results) {
  //Day 1
    //PUTTING DATA INTO SEPERATE CARDS FOR DISPLAY
  const weatherCard1 = document.getElementById("card1");
    //Display Day 1 date in card
  let day1_date = document.createElement("h2");
  day1_date.innerHTML = day1_time;
  weatherCard1.appendChild(day1_date);
    //Day 1 Weather Icon
  if (results.list[1].weather[0].main = "Clouds") {
    icon = cloud;
  } else if (results.list[1].weather[0].main = "Clear") {
    icon = sunny;
  } else if (results.list[1].weather[0].main = "Rain") {
    icon = rain;
  } else if (results.list[1].weather[0].main = "Snow") {
    icon = snow;
  };
  let day1_icon = document.createElement("h2");
  day1_icon.innerHTML = icon;
  weatherCard1.appendChild(day1_icon);
    //Weather Details in List
  const cardData1 = document.createElement("ul");
  weatherCard1.appendChild(cardData1);
    //DAY 1 VARIABLES
  let day1_temp = results.list[1].main.temp;
  let day1_wind = results.list[1].wind.speed;
  let day1_humid =results.list[1].main.humidity;
    //data for temperature
  let listTempDay1 = document.createElement("li");
  listTempDay1.innerHTML = "Temp: " + day1_temp +" Fahrenheit";
  weatherCard1.appendChild(listTempDay1);
  let br1 = document.createElement("br");
  weatherCard1.appendChild(br1); 
    //data for wind speed
  let listWindDay1 = document.createElement("li");
  listWindDay1.innerHTML = "Wind: " + day1_wind +" MPH";
  weatherCard1.appendChild(listWindDay1);
  let br2 = document.createElement("br");
  weatherCard1.appendChild(br2); 
    //data for humidity
  listHumidityDay1 = document.createElement("li");
  listHumidityDay1.innerHTML = "Humidity: " + day1_humid +"% Humidity";
  weatherCard1.appendChild(listHumidityDay1);
  let brEnd1 = document.createElement("br");
  weatherCard1.appendChild(brEnd1); 


  //Day 2 
    //PUTTING DATA INTO SEPERATE CARDS FOR DISPLAY
  const weatherCard2 = document.getElementById("card2");
    //Display Day 2 date in card
  let day2_date = document.createElement("h2");
  day2_date.innerHTML = day2_time;
  weatherCard2.appendChild(day2_date);
    //Day 2 Weather Icon
  if (results.list[2].weather[0].main = "Clouds") {
    icon = cloud;
  } else if (results.list[2].weather[0].main = "Clear") {
    icon = sunny;
  } else if (results.list[2].weather[0].main = "Rain") {
    icon = rain;
  } else if (results.list[2].weather[0].main = "Snow") {
    icon = snow;
  };
  let day2_icon = document.createElement("h2");
  day2_icon.innerHTML = icon;
  weatherCard2.appendChild(day2_icon);
    //Weather Details in List
  const cardData2 = document.createElement("ul");
  weatherCard2.appendChild(cardData2);
    //DAY 2 VARIABLES
  let day2_temp = results.list[2].main.temp;
  let day2_wind = results.list[2].wind.speed;
  let day2_humid =results.list[2].main.humidity;
    //data for temperature
  let listTempDay2 = document.createElement("li");
  listTempDay2.innerHTML = "Temp: " + day2_temp +" Fahrenheit";
  weatherCard2.appendChild(listTempDay2);
  let br3 = document.createElement("br");
  weatherCard2.appendChild(br3);  
    //data for wind speed
  let listWindDay2 = document.createElement("li");
  listWindDay2.innerHTML = "Wind: " + day2_wind +" MPH";
  weatherCard2.appendChild(listWindDay2);
  let br4 = document.createElement("br");
  weatherCard2.appendChild(br4);  
    //data for humidity
  listHumidityDay2 = document.createElement("li");
  listHumidityDay2.innerHTML = "Humidity: " + day2_humid +"% Humidity";
  weatherCard2.appendChild(listHumidityDay2);
  let brEnd2 = document.createElement("br");
  weatherCard2.appendChild(brEnd2); 

  //Day 3 
    //PUTTING DATA INTO SEPERATE CARDS FOR DISPLAY
  const weatherCard3 = document.getElementById("card3");
    //Display Day 3 date in card
  let day3_date = document.createElement("h2");
  day3_date.innerHTML = day3_time;
  weatherCard3.appendChild(day3_date);
    //Day 3 Weather Icon
  if (results.list[3].weather[0].main = "Clouds") {
    icon = cloud;
  } else if (results.list[3].weather[0].main = "Clear") {
    icon = sunny;
  } else if (results.list[3].weather[0].main = "Rain") {
    icon = rain;
  } else if (results.list[3].weather[0].main = "Snow") {
    icon = snow;
  };
  let day3_icon = document.createElement("h2");
  day3_icon.innerHTML = icon;
  weatherCard3.appendChild(day3_icon);
    //Weather Details in List
  const cardData3 = document.createElement("ul");
  weatherCard3.appendChild(cardData3);
    //DAY 3 VARIABLES
  let day3_temp = results.list[3].main.temp;
  let day3_wind = results.list[3].wind.speed;
  let day3_humid =results.list[3].main.humidity;
    //data for temperature
  let listTempDay3 = document.createElement("li");
  listTempDay3.innerHTML = "Temp: " + day3_temp +" Fahrenheit";
  weatherCard3.appendChild(listTempDay3);
  let br5 = document.createElement("br");
  weatherCard3.appendChild(br5);  
    //data for wind speed
  let listWindDay3 = document.createElement("li");
  listWindDay3.innerHTML = "Wind: " + day3_wind +" MPH";
  weatherCard3.appendChild(listWindDay3);
  let br6 = document.createElement("br");
  weatherCard3.appendChild(br6);  
    //data for humidity
  listHumidityDay3 = document.createElement("li");
  listHumidityDay3.innerHTML = "Humidity: " + day3_humid +"% Humidity";
  weatherCard3.appendChild(listHumidityDay3);
  let brEnd3 = document.createElement("br");
  weatherCard3.appendChild(brEnd3); 

  //Day  4 
    //PUTTING DATA INTO SEPERATE CARDS FOR DISPLAY
  const weatherCard4 = document.getElementById("card4");
    //Display Day 4 date in card
  let day4_date = document.createElement("h2");
  day4_date.innerHTML = day4_time;
  weatherCard4.appendChild(day4_date);
    //Day 4 Weather Icon
  if (results.list[4].weather[0].main = "Clouds") {
    icon = cloud;
  } else if (results.list[4].weather[0].main = "Clear") {
    icon = sunny;
  } else if (results.list[4].weather[0].main = "Rain") {
    icon = rain;
  } else if (results.list[4].weather[0].main = "Snow") {
    icon = snow;
  };
  let day4_icon = document.createElement("h2");
  day4_icon.innerHTML = icon;
  weatherCard4.appendChild(day4_icon);
  //Weather Details in List
  const cardData4 = document.createElement("ul");
  weatherCard4.appendChild(cardData4);
  //DAY 4 VARIABLES
  let day4_temp = results.list[4].main.temp;
  let day4_wind = results.list[4].wind.speed;
  let day4_humid =results.list[4].main.humidity;
  //data for temperature
  let listTempDay4 = document.createElement("li");
  listTempDay4.innerHTML = "Temp: " + day4_temp +" Fahrenheit";
  weatherCard4.appendChild(listTempDay4);
  let br7 = document.createElement("br");
  weatherCard4.appendChild(br7);  
  //data for wind speed
  let listWindDay4 = document.createElement("li");
  listWindDay4.innerHTML = "Wind: " + day4_wind +" MPH";
  weatherCard4.appendChild(listWindDay4);
  let br8 = document.createElement("br");
  weatherCard4.appendChild(br8);  
  //data for humidity
  listHumidityDay4 = document.createElement("li");
  listHumidityDay4.innerHTML = "Humidity: " + day4_humid +"% Humidity";
  weatherCard4.appendChild(listHumidityDay4);
  let brEnd4 = document.createElement("br");
  weatherCard4.appendChild(brEnd4); 

  //Day  5 
  //PUTTING DATA INTO SEPERATE CARDS FOR DISPLAY
  const weatherCard5 = document.getElementById("card5");
  //Display Day 5 date in card
  let day5_date = document.createElement("h2");
  day5_date.innerHTML = day5_time;
  weatherCard5.appendChild(day5_date);
  //Day 5 Weather Icon
  if (results.list[5].weather[0].main = "Clouds") {
    icon = cloud;
  } else if (results.list[5].weather[0].main = "Clear") {
    icon = sunny;
  } else if (results.list[5].weather[0].main = "Rain") {
    icon = rain;
  } else if (results.list[5].weather[0].main = "Snow") {
    icon = snow;
  };
  let day5_icon = document.createElement("h2");
  day5_icon.innerHTML = icon;
  weatherCard5.appendChild(day5_icon);
  //Weather Details in List
  const cardData5 = document.createElement("ul");
  weatherCard5.appendChild(cardData5);
  //DAY 5 VARIABLES
  let day5_temp = results.list[5].main.temp;
  let day5_wind = results.list[5].wind.speed;
  let day5_humid =results.list[5].main.humidity;
  //data for temperature
  let listTempDay5 = document.createElement("li");
  listTempDay5.innerHTML = "Temp: " + day5_temp +" Fahrenheit";
  weatherCard5.appendChild(listTempDay5);
  let br9 = document.createElement("br");
  weatherCard5.appendChild(br9);  
  //data for wind speed
  let listWindDay5 = document.createElement("li");
  listWindDay5.innerHTML = "Wind: " + day5_wind +" MPH";
  weatherCard5.appendChild(listWindDay5);
  let br10 = document.createElement("br");
  weatherCard5.appendChild(br10);  
  //data for humidity
  let listHumidityDay5 = document.createElement("li");
  listHumidityDay5.innerHTML = "Humidity: " + day5_humid +"% Humidity";
  weatherCard5.appendChild(listHumidityDay5);
  let brEnd5 = document.createElement("br");
  weatherCard5.appendChild(brEnd5); 
  
};
//Disable Enter Key for Search Bar
document.addEventListener('keypress', function (e) {
  if (e === 13 || e.which === 13) {
      e.preventDefault();
      return false;
  }
});

//Function for Clear Page Button
let clearBtnEl = document.getElementById('clearBtn');
function clearPage() {
onclick(window.location.reload())
};
clearBtnEl.addEventListener('click', clearPage);

//Search Bar history with Working Buttons
function save_history() {
  let new_history = document.getElementById('citySearch').value;
//Set empty array for the search history
if(localStorage.getItem('history') === null) {
  localStorage.setItem('history', '[]');
}
//get data to push to new array
let old_history = JSON.parse(localStorage.getItem('history'));
old_history.push(new_history);
//save both data to local storage
localStorage.setItem('history', JSON.stringify(old_history));
};

function view_history() {
  let recent_data = localStorage.getItem('history');
  let recent = JSON.parse(recent_data);
  
  for (let i = recent.length - 1; i >= 0; i--) {
    let recentSearchBtn = document.createElement('button');
    recentSearchBtn.setAttribute('type', 'button');
    recentSearchBtn.setAttribute('class', 'recentBtn');
    recentSearchBtn.textContent = recent[i];
    recentSearchBtn.addEventListener('click', recentSearchFetch);
    recentSearchBtn.addEventListener('click', disableButton);
    document.getElementById('history').append(recentSearchBtn);
    let cityname = recentSearchBtn.textContent;

    function recentSearchFetch() {
      fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityname+',&units=imperial&appid=20347a25b798ad0bb2e633edc661fefd')
      .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("ERROR");
          }
        })
        .then(data => {
          console.log(data);
          displayWeather(data);
        })
        .catch((error) => console.error("FETCH ERROR:", error));
      
      //5-Day Fetch
      fetch('https://api.openweathermap.org/data/2.5/forecast?q='+recentSearchBtn.textContent+',&units=imperial&appid=20347a25b798ad0bb2e633edc661fefd')
      .then((response_day) => {
          if (response_day.ok) {
            return response_day.json();
          } else {
            throw new Error("ERROR");
          }
        })
        .then(results => {
          console.log(results);
          displayDayWeather(results);
        })
        .catch((error) => console.error("FETCH ERROR:", error));
    };
  }
};

function disableButton() {
  document.getElementById('searchBtn').disabled = true;
  let elements = document.getElementsByClassName("recentBtn");
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled =true;
}
  alert('Please Clear the Page to conduct another search')
};

searchBtnEl.addEventListener('click', save_history, disableButton);
view_history();

