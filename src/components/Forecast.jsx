import { useState, useEffect, use } from 'react'
import Item from './Item'

const API_KEY = import.meta.env.VITE_API_KEY

export default function Forecast({city}) {
  const [forecast, setForecast] = useState(null)
const [isLoading, setIsLoading] = useState(true)
const [error, setError] = useState(null)
  
useEffect(() => {
  if (city) {
    getForecast(city)
  }
}, [city])


  async function getForecast() {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      )
      const data = await response.json()
      const grouped = {}
      data.list.forEach((item) => {
        const date = item.dt_txt.split(' ')[0]
        if (!grouped[date]) {
          grouped[date] = []
        }
        grouped[date].push(item)
      })
      const dailyForecast = Object.keys(grouped).map((date) => {
        const dayData = grouped[date]
        const tempMin = Math.min(...dayData.map((item) => item.main.temp_min))
        const tempMax = Math.max(...dayData.map((item) => item.main.temp_max))
        const weather = dayData[0].weather[0]
        const wind = dayData[0].wind
        const humidity = dayData[0].main.humidity
        return {
          date,
          tempMin,
          tempMax,
          weather,
          wind,
          humidity,
        }
      })
      console.log(dailyForecast.slice(1))
      setForecast(dailyForecast.slice(1))
    } catch (error) {
      setError("Failed to fetch forecast data. Please try again.")
      console.error('Error fetching forecast data:', error)
    }finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="forecast">
      <h2>5-Day Forecast</h2>
      {isLoading && <p>Loading...</p>}  
      {error && <p>{error}</p>}
      {forecast && (
        <div className="forecast-items">
          {forecast.map((item) => (
            <Item key={item.date} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
