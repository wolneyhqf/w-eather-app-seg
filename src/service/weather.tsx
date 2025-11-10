import api from "./http"

export interface CityWeatherResponse {
  current:{
    dt: number;
    temp: number;
    wind_speed: number;
    humidity: number;
    pressure: number;
    uvi: number;
  }
}

export async function getCityWeather({lat, lon}: {lat: number, lon: number}){
    const response = await api.get('/data/3.0/onecall', {
      params: {
        lat,
        lon,
        exclude: 'alerts,minutely',
        appid: process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY,
        units: 'metric',
      },
    })
    
    return response.data
  }