import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Image,
} from "react-native";
import * as Location from "expo-location";
import { Magnetometer } from "expo-sensors";
import { StatusBar } from "expo-status-bar";
import { Wind, Droplets, Thermometer } from "lucide-react-native";

const { width } = Dimensions.get("window");
const COMPASS_SIZE = Math.min(width * 0.6, 300);
const MAX_ANGLE_SAMPLES = 10;
const PRIMARY_BLUE = "#3B82F6";
const WHITE = "#FFFFFF";

export default function ExploreScreen() {
  const rotation = useRef(new Animated.Value(0)).current;
  const angleHistory = useRef<number[]>([]);

  const [heading, setHeading] = useState(0);
  const [locationName, setLocationName] = useState("Locating...");
  const [weather, setWeather] = useState<any>(null);

  // Magnetometer: Smooth heading updates
  useEffect(() => {
    const sub = Magnetometer.addListener(({ x, y }) => {
      let angle = (Math.atan2(y, x) * 180) / Math.PI;
      angle = angle >= 0 ? angle : angle + 360;

      const history = angleHistory.current;
      history.push(angle);
      if (history.length > MAX_ANGLE_SAMPLES) history.shift();

      const avg = history.reduce((a, b) => a + b, 0) / history.length;
      setHeading(avg);
    });

    Magnetometer.setUpdateInterval(400);
    return () => sub.remove();
  }, []);

  // Animate compass rotation
  useEffect(() => {
    Animated.timing(rotation, {
      toValue: -heading,
      duration: 150,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [heading]);

  // Fetch location + mock weather
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      const [geo] = await Location.reverseGeocodeAsync(loc.coords);
      setLocationName(`${geo?.city ?? "Unknown"}, ${geo?.region ?? ""}`.trim());

      setWeather({
        temperature: 23,
        feelsLike: 24,
        humidity: 58,
        windSpeed: 5,
        windDirection: "NE",
        condition: "Sunny",
      });
    })();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <Text style={styles.location}>{locationName}</Text>

      <View style={styles.centerContainer}>
        <Animated.View
          style={[
            styles.imageContainer,
            {
              transform: [
                {
                  rotate: rotation.interpolate({
                    inputRange: [-360, 0, 360],
                    outputRange: ["-720deg", "0deg", "720deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <Image
            source={require("../../assets/images/compass.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>

        <Text style={styles.headingText}>{Math.round(heading)}°</Text>
      </View>

      {weather && (
        <View style={styles.weatherCard}>
          <View style={styles.weatherHeader}>
            <Text style={styles.temperature}>
              {Math.round(weather.temperature)}°
            </Text>
            <Text style={styles.condition}>{weather.condition}</Text>
          </View>

          <View style={styles.weatherDetails}>
            <WeatherDetail
              icon={Wind}
              text={`${weather.windSpeed} mph ${weather.windDirection}`}
            />
            <WeatherDetail icon={Droplets} text={`${weather.humidity}%`} />
            <WeatherDetail
              icon={Thermometer}
              text={`Feels like ${Math.round(weather.feelsLike)}°`}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

// Weather Detail Item Component
function WeatherDetail({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <View style={styles.detailItem}>
      <Icon size={20} color={PRIMARY_BLUE} />
      <Text style={styles.detailText}>{text}</Text>
    </View>
  );
}

// ------------------ Styles ------------------

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: PRIMARY_BLUE,
    alignItems: "center",
  },
  location: {
    marginTop: 20,
    fontSize: 18,
    color: WHITE,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  headingText: {
    marginTop: 20,
    fontSize: 36,
    color: WHITE,
    fontWeight: "bold",
  },
  weatherCard: {
    width: "90%",
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  weatherHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  temperature: {
    fontSize: 36,
    fontWeight: "bold",
    color: PRIMARY_BLUE,
  },
  condition: {
    fontSize: 18,
    color: PRIMARY_BLUE,
  },
  weatherDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  detailText: {
    color: PRIMARY_BLUE,
    marginLeft: 6,
    fontSize: 14,
  },
});
