import { Text, View, StyleSheet } from "react-native";

export interface CityWeatherData {
    date: string;
    city: string;
    temperature: number;
    windSpeed: number;
    humidity: number;
    pressure: number;
    uv: number;
}

export interface CityWeatherCardProps {
   cityWeatherData: CityWeatherData
}

export default function CityWeatherCard({ cityWeatherData }: CityWeatherCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.cityName}>{cityWeatherData.city}</Text>
                    <Text style={styles.date}>{cityWeatherData.date}</Text>
                </View>
                
                <View style={styles.temperatureContainer}>
                    <Text style={styles.temperature}>{cityWeatherData.temperature}°</Text>
                    <Text style={styles.celsius}>C</Text>
                </View>
                
                <View style={styles.weatherDetails}>
                    <View style={styles.detailRow}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Wind</Text>
                            <Text style={styles.detailValue}>{cityWeatherData.windSpeed} m/s</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Humidity</Text>
                            <Text style={styles.detailValue}>{cityWeatherData.humidity}%</Text>
                        </View>
                    </View>
                    
                    <View style={styles.detailRow}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Pressure</Text>
                            <Text style={styles.detailValue}>{cityWeatherData.pressure} hPa</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>UV Index</Text>
                            <Text style={styles.detailValue}>{cityWeatherData.uv}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    card: {
        backgroundColor: '#667eea',
        borderRadius: 20,
        padding: 24,
        height: 360,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    cityName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    date: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },
    temperatureContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        marginBottom: 30,
    },
    temperature: {
        fontSize: 64,
        fontWeight: '300',
        color: '#ffffff',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    celsius: {
        fontSize: 24,
        fontWeight: '300',
        color: 'rgba(255, 255, 255, 0.8)',
        marginLeft: 4,
    },
    weatherDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    detailItem: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 8,
        marginHorizontal: 4,
    },
    detailLabel: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: '500',
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    detailValue: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '600',
        textAlign: 'center',
    },
});