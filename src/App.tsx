import { StyleSheet, View, FlatList  } from 'react-native';
import CityWeatherCard, { CityWeatherData } from './components/CityWeatherCard';
import ForecastModal, { ForecastData } from './components/ForecastModal';
import { useEffect, useState } from 'react';
import { getCityWeather } from './service/weather';
import { mapCityWeather, mapForecast } from './helpers/mappers';

interface CityWithForecast extends CityWeatherData {
  forecast?: ForecastData[];
}

export default function App() {
  const [cities, setCities] = useState<CityWithForecast[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [forecastModalVisible, setForecastModalVisible] = useState(false);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);

  async function fetchDefaultCities() {
    const [caruaruWeather, saoPauloWeather, londonWeather] = await Promise.all([
      getCityWeather({
        lat: -8.2829702,
        lon: -35.9722852,
      }),
      getCityWeather({
        lat: -23.5506507,
        lon: -46.6333824,
      }),
      getCityWeather({
        lat: 51.5073219,
        lon: -0.1276474,
      }),
    ]);

    const cityWeatherData: CityWithForecast = {
      ...mapCityWeather(caruaruWeather, 'Caruaru'),
      forecast: mapForecast(caruaruWeather),
    };
    const saoPauloWeatherData: CityWithForecast = {
      ...mapCityWeather(saoPauloWeather, 'São Paulo'),
      forecast: mapForecast(saoPauloWeather),
    };
    const londonWeatherData: CityWithForecast = {
      ...mapCityWeather(londonWeather, 'Londres'),
      forecast: mapForecast(londonWeather),
    };
    
    setCities([
      cityWeatherData, 
      saoPauloWeatherData, 
      londonWeatherData
    ]);
  }

  function handleRemoveCity(cityName: string) {
    setCities(cities.filter(city => city.city !== cityName));
  }

  function handleViewForecast(cityName: string) {
    const city = cities.find(c => c.city === cityName);
    if (city && city.forecast) {
      setSelectedCity(cityName);
      setForecastData(city.forecast);
      setForecastModalVisible(true);
    }
  }

  function handleCloseForecast() {
    setForecastModalVisible(false);
    setSelectedCity(null);
    setForecastData([]);
  }

  useEffect(() => {
    fetchDefaultCities();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cities}
        renderItem={({item}) => (
          <CityWeatherCard 
            cityWeatherData={item}
            onRemove={() => handleRemoveCity(item.city)}
            onViewForecast={() => handleViewForecast(item.city)}
          />
        )}
        keyExtractor={item => item.city}
      />
      
      <ForecastModal
        visible={forecastModalVisible}
        city={selectedCity || ''}
        forecast={forecastData}
        onClose={handleCloseForecast}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 60,
  },
});
