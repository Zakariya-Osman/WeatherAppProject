import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

const API_KEY = "0e6e03c5c64e4baf940220745251404";

const WeeklyWeather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTemp, setCurrentTemp] = useState<number | null>(null);
  const [todayDate, setTodayDate] = useState<string | null>(null); // accurate from API

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const forecastRes = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Calgary&days=7`
        );
        const forecastData = await forecastRes.json();

        const currentRes = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Calgary`
        );
        const currentData = await currentRes.json();

        const today = currentData.location.localtime.split(" ")[0]; // e.g. '2025-04-15'

        // Filter out any forecast days before today
        const filteredForecast = forecastData.forecast.forecastday.filter(
          (item: any) => item.date >= today
        );

        setTodayDate(today);
        setCurrentTemp(currentData.current.temp_c);
        setWeatherData(filteredForecast);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const renderItem = ({
    item,
  }: {
    item: {
      date: string;
      day: { condition: { text: string }; avgtemp_c: number };
    };
  }) => {
    const isToday = item.date === todayDate;

    return (
      <View style={styles.weatherItem}>
        <Text style={[styles.day, isToday && styles.today]}>
          {isToday ? "Today" : formatDate(item.date)}
        </Text>
        <Text style={styles.condition}>{item.day.condition.text}</Text>
        <Text style={styles.temp}>
          {isToday && currentTemp !== null ? currentTemp : item.day.avgtemp_c}°C
        </Text>
      </View>
    );
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Weekly Weather - Calgary</Text>
      <FlatList
        data={weatherData}
        renderItem={renderItem}
        keyExtractor={(item) => item.date}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A7BD5",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  weatherItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  day: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    flex: 1,
  },
  today: {
    color: "#2563EB",
    fontWeight: "bold",
  },
  condition: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#475569",
    flex: 1,
    textAlign: "center",
  },
  temp: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    flex: 1,
    textAlign: "right",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#3A7BD5",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WeeklyWeather;
