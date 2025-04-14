import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from "react-native";

const API_KEY = "0e6e03c5c64e4baf940220745251404";

const TodayWeather = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Calgary&days=1`
        );
        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching today’s weather:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const {
    location,
    current,
    forecast: { forecastday },
  } = weather;

  const forecastToday = forecastday[0].day;
  const lastUpdated = current.last_updated;

  const formatFullDate = () => {
    return new Date(current.last_updated).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Today's Weather - {location.name}</Text>
      <Text style={styles.date}>{formatFullDate()}</Text>

      <Image
        source={{ uri: "https:" + current.condition.icon }}
        style={styles.icon}
      />
      <Text style={styles.temp}>{current.temp_c}°C</Text>
      <Text style={styles.condition}>{current.condition.text}</Text>

      <Text style={styles.details}>Feels like: {current.feelslike_c}°C</Text>
      <Text style={styles.details}>High: {forecastToday.maxtemp_c}°C</Text>
      <Text style={styles.details}>Low: {forecastToday.mintemp_c}°C</Text>
      <Text style={styles.details}>Humidity: {current.humidity}%</Text>
      <Text style={styles.details}>Wind: {current.wind_kph} km/h</Text>

      <Text style={styles.updated}>Last updated: {lastUpdated}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A7BD5",
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  date: {
    fontSize: 18,
    color: "#e0f2fe",
    marginBottom: 10,
    fontWeight: "500",
  },
  icon: {
    width: 100,
    height: 100,
  },
  temp: {
    fontSize: 48,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },
  condition: {
    fontSize: 20,
    color: "#fff",
    fontStyle: "italic",
    marginBottom: 20,
  },
  details: {
    fontSize: 16,
    color: "#e0f2fe",
    marginTop: 5,
  },
  updated: {
    marginTop: 20,
    fontSize: 12,
    color: "#cbd5e1",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#3A7BD5",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TodayWeather;
