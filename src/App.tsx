import { StyleSheet, View, FlatList, TextInput, TouchableOpacity, Text } from 'react-native';
import CityWeatherCard, { CityWeatherData } from './components/CityWeatherCard';
import ForecastModal, { ForecastData } from './components/ForecastModal';
import { useEffect, useState } from 'react';
import { getCityWeather } from './service/weather';
import { searchCities, CitySearchResult } from './service/geolocation';
import { mapCityWeather, mapForecast } from './helpers/mappers';

interface CityWithForecast extends CityWeatherData {
  forecast?: ForecastData[];
}

export default function App() {
  const [cities, setCities] = useState<CityWithForecast[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [forecastModalVisible, setForecastModalVisible] = useState(false);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CitySearchResult[]>([]);

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
      ...mapCityWeather(caruaruWeather, 'Caruaru, BR'),
      forecast: mapForecast(caruaruWeather),
    };
    const saoPauloWeatherData: CityWithForecast = {
      ...mapCityWeather(saoPauloWeather, 'São Paulo, BR'),
      forecast: mapForecast(saoPauloWeather),
    };
    const londonWeatherData: CityWithForecast = {
      ...mapCityWeather(londonWeather, 'London, UK'),
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
  
  async function handleSearchCities(query: string) {
    setSearchQuery(query);
    
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await searchCities(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching cities:', error);
      setSearchResults([]);
    }
  }

  async function handleAddCity(cityResult: CitySearchResult) {
    const cityName = `${cityResult.name}, ${cityResult.country}`;

    if (cities.some(city => city.city === cityName)) {
      setSearchQuery('');
      setSearchResults([]);
      return;
    }

    try {
      const weatherData = await getCityWeather({
        lat: cityResult.lat,
        lon: cityResult.lon,
      });

      const newCity: CityWithForecast = {
        ...mapCityWeather(weatherData, cityName),
        forecast: mapForecast(weatherData),
      };

      setCities([...cities, newCity]);
      setSearchQuery('');
      setSearchResults([]);
    } catch (error) {
      console.error('Error adding city:', error);
    }
  }

  useEffect(() => {
    fetchDefaultCities();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar cidade..."
          value={searchQuery}
          onChangeText={handleSearchCities}
          placeholderTextColor="#999"
        />
        {searchResults.length > 0 && (
          <View style={styles.searchResultsContainer}>
            <FlatList
              data={searchResults}
              keyExtractor={(item, index) => `${item.name}-${item.lat}-${item.lon}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.searchResultItem}
                  onPress={() => handleAddCity(item)}
                >
                  <Text style={styles.searchResultText}>
                    {item.name}
                    {item.state && `, ${item.state}`}
                    {`, ${item.country}`}
                  </Text>
                </TouchableOpacity>
              )}
              nestedScrollEnabled
            />
          </View>
        )}
      </View>

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
    paddingTop: 60,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    zIndex: 1,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
  },
  searchResultsContainer: {
    marginTop: 8,
    maxHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchResultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchResultText: {
    fontSize: 16,
    color: '#333',
  },
});
