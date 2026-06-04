import { useEffect, useState } from 'react'
import Form from './components/Form'
import Summary from './components/Summary'
import Forecast from './components/Forecast'

import './App.css'

const API_KEY = import.meta.env.VITE_API_KEY

function App() {
const [city, setCity] = useState('Denver')


function updateCity(city) {
  setCity(city)
}



  return (
    <div className="page">
      <h1>Weather Application</h1>
      <Form updateCity={updateCity} city={city}/>
      <Summary city={city} />
      <Forecast city={city} />
    </div>
  )
}

export default App
