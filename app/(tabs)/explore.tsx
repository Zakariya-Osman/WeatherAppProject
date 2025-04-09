import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from "react-native";
import * as Location from "expo-location";
import { Magnetometer } from "expo-sensors";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");
const COMPASS_SIZE = Math.min(width * 0.8, 400);
const SMOOTHING_FACTOR = 0.15;
const WHITE = "#FFFFFF";
const BLUE = "#3B82F6";

export default function CompassScreen() {
  const rotation = useRef(new Animated.Value(0)).current;
  const [trueNorth, setTrueNorth] = useState(0);
  const [declination, setDeclination] = useState(0);
  const lastUpdate = useRef(Date.now());

  useEffect(() => {
    let magSub: { remove: () => void };
    let locationSub: Location.LocationSubscription;

    const setupCompass = async () => {
      const [magStatus, locStatus] = await Promise.all([
        Magnetometer.getPermissionsAsync(),
        Location.requestForegroundPermissionsAsync(),
      ]);

      if (!magStatus.granted || !locStatus.granted) return;

      // Get initial position for declination
      const location = await Location.getCurrentPositionAsync({});
      updateDeclination(location.coords);

      // Watch position changes
      locationSub = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 100,
        },
        (loc) => updateDeclination(loc.coords)
      );

      // Magnetometer setup
      Magnetometer.setUpdateInterval(100);
      magSub = Magnetometer.addListener(({ x, y }) => {
        const now = Date.now();
        if (now - lastUpdate.current < 100) return;

        lastUpdate.current = now;
        const magneticHeading = (Math.atan2(y, x) * 180) / Math.PI;
        const trueHeading = (magneticHeading + declination + 360) % 360;

        Animated.spring(rotation, {
          toValue: -trueHeading,
          useNativeDriver: true,
          speed: 20,
          bounciness: 0,
        }).start();

        setTrueNorth(trueHeading);
      });
    };

    const updateDeclination = async (coords: Location.LocationObjectCoords) => {
      try {
        const declination = await Location.getHeadingAsync();
        setDeclination(declination.magHeading - declination.trueHeading);
      } catch (error) {
        console.log("Error getting declination:", error);
      }
    };

    setupCompass();
    return () => {
      magSub?.remove();
      locationSub?.remove();
    };
  }, [declination]);

  const getCardinalDirection = (degrees: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(degrees / 45) % 8];
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.compassContainer}>
        <Animated.View
          style={[
            styles.compass,
            {
              transform: [
                {
                  rotate: Animated.multiply(rotation, -1).interpolate({
                    inputRange: [-360, 360],
                    outputRange: ["-360deg", "360deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <Image
            source={require("../../assets/images/compass.png")} // Use your compass image
            style={styles.compassImage}
            resizeMode="contain"
          />
          <View style={styles.marker} />
        </Animated.View>

        <View style={styles.headingBox}>
          <Text style={styles.headingText}>{Math.round(trueNorth)}°</Text>
          <Text style={styles.directionText}>
            {getCardinalDirection(trueNorth)}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE,
    justifyContent: "center",
    alignItems: "center",
  },
  compassContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  compass: {
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
    position: "relative",
  },
  compassImage: {
    width: "100%",
    height: "100%",
    tintColor: WHITE,
  },
  marker: {
    position: "absolute",
    top: "2%",
    left: "50%",
    width: 4,
    height: "12%",
    backgroundColor: WHITE,
    borderRadius: 2,
    transform: [{ translateX: -2 }],
  },
  headingBox: {
    position: "absolute",
    bottom: "15%",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  headingText: {
    fontSize: 42,
    color: WHITE,
    fontWeight: "700",
  },
  directionText: {
    fontSize: 24,
    color: WHITE,
    marginTop: 8,
    textTransform: "uppercase",
  },
});
