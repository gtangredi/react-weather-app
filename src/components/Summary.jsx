
import { useState, useEffect } from 'react'
const API_KEY = import.meta.env.VITE_API_KEY

export default function Summary({city}) {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (city) {
      getcurrentWeather(city)
    }
  }, [city])
  
  async function getcurrentWeather() {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      const data = await response.json()
      const currentWeather = {
        temp: data.main.temp,
        weather: data.weather[0],
        wind: data.wind,
        humidity: data.main.humidity,
      }
      setCurrentWeather(currentWeather)
      console.log(currentWeather)
    } catch (error) {
      setError("Failed to fetch weather data. Please try again.")
      console.error('Error fetching weather data:', error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
   <div className="summary">
    <h2>Current Weather in {city}</h2>
    {isLoading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    {currentWeather && (
      <div className="current-weather">
        <p>Temperature: {currentWeather.temp}°C</p>
        <p>Weather: {currentWeather.weather.description}</p>
        <p>
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather.weather.icon}.png`}
            alt={currentWeather.weather.description}
          />
        </p>
        <p>Wind Speed: {currentWeather.wind.speed} m/s</p>
        <p>Humidity: {currentWeather.humidity}%</p>
      </div>
    )}  
    </div>
  )
}
