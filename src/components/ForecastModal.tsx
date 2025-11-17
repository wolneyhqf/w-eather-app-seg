import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export interface ForecastData {
  date: string;
  temp: {
    min: number;
    max: number;
  };
  humidity: number;
  windSpeed: number;
  pressure: number;
  uv: number;
  description?: string;
}

export interface ForecastModalProps {
  visible: boolean;
  city: string;
  forecast: ForecastData[];
  onClose: () => void;
}

export default function ForecastModal({ visible, city, forecast, onClose }: ForecastModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Forecast - {city}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.forecastList} showsVerticalScrollIndicator={false}>
            {forecast.map((item, index) => (
              <View key={index} style={styles.forecastItem}>
                <View style={styles.forecastItemHeader}>
                  <Text style={styles.forecastDate}>{item.date}</Text>
                  <Text style={styles.forecastTemp}>
                    {item.temp.max}° / {item.temp.min}°
                  </Text>
                </View>
                
                <View style={styles.forecastDetails}>
                  <View style={styles.forecastDetailRow}>
                    <Text style={styles.forecastDetailLabel}>Wind Speed:</Text>
                    <Text style={styles.forecastDetailValue}>{item.windSpeed} m/s</Text>
                  </View>
                  <View style={styles.forecastDetailRow}>
                    <Text style={styles.forecastDetailLabel}>Humidity:</Text>
                    <Text style={styles.forecastDetailValue}>{item.humidity}%</Text>
                  </View>
                  <View style={styles.forecastDetailRow}>
                    <Text style={styles.forecastDetailLabel}>Pressure:</Text>
                    <Text style={styles.forecastDetailValue}>{item.pressure} hPa</Text>
                  </View>
                  <View style={styles.forecastDetailRow}>
                    <Text style={styles.forecastDetailLabel}>UV Index:</Text>
                    <Text style={styles.forecastDetailValue}>{item.uv}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },
  forecastList: {
    paddingHorizontal: 20,
  },
  forecastItem: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  forecastItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  forecastDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  forecastTemp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
  },
  forecastDetails: {
    gap: 8,
  },
  forecastDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forecastDetailLabel: {
    fontSize: 14,
    color: '#666',
  },
  forecastDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

