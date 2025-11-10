import { StyleSheet, View, FlatList  } from 'react-native';
import CityWeatherCard, { CityWeatherData } from './components/CityWeatherCard';
import { useEffect, useState } from 'react';
import { getCityWeather } from './service/weather';
import { mapCityWeather } from './helpers/mappers';


export default function App() {
  const [cities, setCities] = useState<CityWeatherData[]>([]);

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

    const cityWeatherData = mapCityWeather(caruaruWeather, 'Caruaru');
    const saoPauloWeatherData = mapCityWeather(saoPauloWeather, 'São Paulo');
    const londonWeatherData = mapCityWeather(londonWeather, 'Londres');
    setCities([
      cityWeatherData, 
      saoPauloWeatherData, 
      londonWeatherData
    ]);
  }

  useEffect(() => {
    fetchDefaultCities();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cities}
        renderItem={({item}) => <CityWeatherCard cityWeatherData={item} />}
        keyExtractor={item => item.city}
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
