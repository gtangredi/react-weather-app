import { useState } from "react"


export default function Form({ getWeather }) {
  const [city, setCity] = useState('Denver')

    function handleSubmit(e) {
      e.preventDefault()
      getWeather(city)
    }
    
  return (
    <div>
      <form>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
    </div>
  )
}
