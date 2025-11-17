import { CityWeatherData } from "../components/CityWeatherCard";
import { CityWeatherResponse } from "../service/weather";
import { ForecastData } from "../components/ForecastModal";

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

function mapForecast(response: CityWeatherResponse): ForecastData[] {
  if (!response.daily) {
    return [];
  }

  return response.daily.slice(0, 7).map((day) => ({
    date: new Date(day.dt * 1000).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }),
    temp: {
      min: Math.round(day.temp.min),
      max: Math.round(day.temp.max),
    },
    humidity: day.humidity,
    windSpeed: day.wind_speed,
    pressure: day.pressure,
    uv: day.uvi,
    description: day.weather?.[0]?.description,
  }));
}

export { mapCityWeather, mapForecast }