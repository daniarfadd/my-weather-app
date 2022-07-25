import { useState } from "react"
import axios from "axios"

function App() {

  const [apiData, setApiData] = useState({})
  const [location, setLocation] = useState("")

  const API_KEY = "b097b620ab08ebd526cabd0674a44626"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`


//  Connect to API

  function searchLocation(event) {
    if (event.key === 'Enter'){
      axios.get(url).then(response => {
        setApiData(response.data)
        // console.log(response.data)
        
      })
      setLocation('')
    }
  }

 // Main Temperature Kelvin to Celcius
 const kelvToCelcius = apiData.main ? Math.floor(apiData.main.temp - 273.15) : null

 // Feels like temperature  Kelvin to Celcius
 const feelsKelvinToCelcius = apiData.main ? Math.floor(apiData.main.feels_like - 273.15) : null


  // console.log(JSON.stringify(apiData) === '{}')

 

  return (
    <div className="app">

      <div className="search">
        <input 
        type="text" 
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter City'
        />
      </div>

      {
        JSON.stringify(apiData) !== '{}' ? 
        
        <div className="container">
        <div className="top">
          <div className="location" >
            <p>{apiData.name}, {apiData.sys.country}</p>
          </div>
          <div className="temp">
            <h1>{kelvToCelcius} °C</h1>
          </div>
          <div className="description">
            <p>{apiData.weather[0].main}</p>
            <p>{apiData.weather[0].description}</p>
          </div>
        </div>

        <div className="logo--container">
          <img src={`../assets/${apiData.weather[0].icon}.svg`} alt="logo" className="logo"/>
        </div>

        <div className="bottom">
          <div className="feels">
            <p className="bold">{feelsKelvinToCelcius} °C</p>
            <p>Feels Like</p>
          </div>

          <div className="humidity">
            <p className="bold">{apiData.main.humidity}%</p>
            <p>Humidity</p>
          </div>

          <div className="wind">
            <p className="bold">{apiData.wind.speed} MPS</p>
            <p>Wind Speed</p>
          </div>
        </div>

      </div>
      :
      <div className="opening">
        <h1>WELCOME</h1>
        <h4>Enter the city you like to know the weather conditions</h4>

      </div>
      }
      
    </div>
  )
}

export default App
