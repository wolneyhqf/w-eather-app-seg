import api from "./http"

export interface CitySearchResult {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
  }
  
  export async function searchCities(query: string): Promise<CitySearchResult[]> {
    if (!query || query.trim().length < 2) {
      return [];
    }
  
    const response = await api.get('/geo/1.0/direct', {
      params: {
        q: query,
        limit: 5,
        appid: process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY,
      },
    });
  
    return response.data.map((city: any) => ({
      name: city.name,
      lat: city.lat,
      lon: city.lon,
      country: city.country,
      state: city.state,
    }));
  }