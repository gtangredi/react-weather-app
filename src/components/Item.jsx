

export default function Item({item}) {
  return (
    <div>
      <h3>{item.date}</h3>
      <p>Min Temp: {item.tempMin}°C</p>
      <p>Max Temp: {item.tempMax}°C</p>
      <p>Weather: {item.weather.description}</p>
      <p>Wind Speed: {item.wind.speed} m/s</p>
      <p>Humidity: {item.humidity}%</p>
    </div>
  )
}
