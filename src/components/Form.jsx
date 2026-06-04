import { useState } from "react"


export default function Form({ updateCity, city }) {
  const [cityInput, setCity] = useState(city)

    function handleSubmit(e) {
      e.preventDefault()
      updateCity(cityInput)
    }
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
    </div>
  )
}
