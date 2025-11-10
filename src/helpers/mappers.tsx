import { CityWeatherData } from "../components/CityWeatherCard";
import { CityWeatherResponse } from "../service/weather";

function mapCityWeather(response: CityWeatherResponse, cityName: string): CityWeatherData {
  return {
    date: new Date(response.current.dt * 1000).toLocaleDateString('pt-BR'),
    city: cityName,
    temperature: response.current.temp,
    windSpeed: response.current.wind_speed,
    humidity: response.current.humidity,
    pressure: response.current.pressure,
    uv: response.current.uvi,
  }
}

export { mapCityWeather }