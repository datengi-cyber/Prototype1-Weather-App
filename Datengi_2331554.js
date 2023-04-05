let weather = {
    apiKey: "c2e6778c1e79a9a3394a5c3b4ecf33dc",
    // making a function and send the city to fetch the weather data
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
      // eror handeling part Incase of wrong city name 
        .then((response) => {
          if (!response.ok) {
            alert("Invalid City Name ");
            throw new Error("Invalid City Name .");
          }
          // when the response is okk, then return the data in json format
          return response.json();
        })
        // to dispaly the data on the page 
        .then((data) => this.displayWeather(data));
    },
    // function to display the data on the page and retrive only specific data only which we required 
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity, pressure } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = Math.round(temp )+ "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
        document.querySelector (".pressure").innerText =
     "Pressure: " + pressure + "mb";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";

        
        // after fecthing the data removing the previous defult data or loding class
      document.querySelector(".weather").classList.remove("loading");
// chaning the background img acoding to the cityname 
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },

    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  // for digital clock
  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
  
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
    document.getElementById('digital-time').textContent = timeString;
  }
  
  // for 
setInterval(updateTime, 1000); 

const currentDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('en-US', options);
const dateElement = document.getElementById('date');
dateElement.innerText = formattedDate;

 document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  // function call when we press enter button in our keybord using keyup event listnaer
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  // it sets the defult information of weather of the city which was assined to me.
  weather.fetchWeather("Winston-Salem");