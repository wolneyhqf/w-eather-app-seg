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
  daily?: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    humidity: number;
    wind_speed: number;
    pressure: number;
    uvi: number;
    weather?: Array<{
      description: string;
    }>;
  }>;
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