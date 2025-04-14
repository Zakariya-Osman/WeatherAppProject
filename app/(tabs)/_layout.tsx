import React from "react";
import { Platform } from "react-native";
import { Tabs } from "expo-router";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const iconColor = "white";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: "absolute", borderTopWidth: 0 },
          android: { elevation: 0 },
        }),
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: "Today",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="weather-partly-cloudy"
              size={24}
              color={iconColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Weekly",
          tabBarIcon: () => (
            <FontAwesome5 name="calendar-week" size={20} color={iconColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="compass"
        options={{
          title: "Compass",
          tabBarIcon: () => (
            <FontAwesome5 name="compass" size={24} color={iconColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: () => (
            <AntDesign name="user" size={24} color={iconColor} />
          ),
        }}
      />
    </Tabs>
  );
}
