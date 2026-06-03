import { useEffect, useState } from 'react'
import Form from './components/Form'
import Summary from './components/Summary'
import Forecast from './components/Forecast'

import './App.css'

const API_KEY = import.meta.env.VITE_API_KEY

function App() {
  

  useEffect(() => {


    return () => {
      getForecast()
    }
  }, [])

function getWeather(city) {
  getcurrentWeather(city)
  getForecast(city)
}

  async function getcurrentWeather() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`
      )
      const data = await response.json()
      const currentWeather = {
        temp: data.main.temp,
        weather: data.weather[0],
        wind: data.wind,
        humidity: data.main.humidity,
      }
      console.log(currentWeather)
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  async function getForecast() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${API_KEY}&units=metric`
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
    } catch (error) {
      console.error('Error fetching forecast data:', error)
    }
  }

  return (
    <div className="page">
      <h1>Weather Application</h1>
      <Form getWeather={getWeather} />
      <Summary />
      <Forecast />
    </div>
  )
}

export default App
