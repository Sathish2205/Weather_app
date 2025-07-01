
import './app.css'
import { useEffect, useState } from "react";

function App() {

  let showdate = new Date();
  let displaytodaydate = showdate.getDate() + '/' + (showdate.getMonth() + 1)
  let dt = showdate.toDateString();

  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState({})

  const changeQuery = (e)=> {
    setQuery(e.target.value)
  }


  const getWeather = () => {

  if (query.trim() === "") {
    alert("Enter City");
    return;
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=57b3d6877fb0ca2ffc6ee5b87a8c05c7`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        // if the response is NOT ok (e.g. 404), throw an error
        throw new Error("City not found.");
      }
      return res.json();
    })
    .then((resp) => {
      setWeather(resp);
    })
    .catch((err) => {
      console.error("Error fetching weather:", err.message);
      setWeather({}); // clear weather data if error
     alert("City not found. Please check the name and try again.");
    });
};



  return (
    <div className="app">
      <div className='head'>
        <h1>Weather Report</h1>

        <div>
          <input className="btn bg-transparent" style={{borderColor:"White",color:"white"}} type="text" value={query} onChange={changeQuery} placeholder="Enter city" />
          <button className='btn btn-primary' onClick={getWeather}>Get Weather</button>
        </div>
      </div>
      {weather.main &&
        <div>
          <div className='wraper'>

            <div id="temp">

              Temp<span>{Math.round(weather.main.temp - 272.15)}</span>°C</div>
            <div id='content'>
              <div id="city">{weather.name} {weather.sys.country} <i class="fa-solid fa-location-dot"></i></div>
              <div id='date'>{dt}</div>
              <div id='icon'>
                <img style={{ width: "150px", marginLeft: "80px" }} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
              </div>
              <div style={{ fontSize: "20px", marginLeft: "20px", fontWeight: "bold", textAlign: "center" }}>{weather.weather[0].description}</div>
            </div>
          </div>
          <div className='content2'>
            <div id='box'>Humidity
              <i class="fa-solid fa-droplet"></i>
              <div>
                <span>{weather.main.humidity}</span>%
              </div>
            </div>
            <div id='box'>Pressure
              <i class="fa-solid fa-gauge"></i>
              <div>
                <span> {weather.main.pressure}</span>hPa
              </div>
            </div>
            <div id='box'>Wind Speed
              <h5 class="fa-solid fa-wind"></h5>
              <div>
                <span> {weather.wind.speed}</span>m/h
              </div>
            </div>

            <div id='box'>Clouds
              <i class="fa-solid fa-cloud"></i>
              <div>
                <span> {weather.clouds.all}</span>%
              </div>
            </div>
          </div>
        </div>

      }

    </div>
  );
}

export default App;