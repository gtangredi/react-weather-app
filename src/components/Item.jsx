

export default function Item({item}) {
  return (
    <div className="forecast-item">
      <h3>{item.date}</h3>
      <img src={`https://openweathermap.org/img/wn/${item.weather.icon}.png`} alt={item.weather.description} />
      <p>Min Temp: {item.tempMin}°C</p>
      <p>Max Temp: {item.tempMax}°C</p>
      <p>Weather: {item.weather.description}</p>
      <p>Wind Speed: {item.wind.speed} m/s</p>
      <p>Humidity: {item.humidity}%</p>
    </div>
  )
}
