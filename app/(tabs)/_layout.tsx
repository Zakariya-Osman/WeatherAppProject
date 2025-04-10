import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="countries"
        options={{
          title: "Countries",
          tabBarIcon: ({ color }) => (
            <Ionicons name="globe-outline" size={24} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="compass-screen"
        options={{
          title: "Compass",
          tabBarIcon: ({ color }) => (
            <Ionicons name="compass" size={24} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="weekly-weather"
        options={{
          title: "Weekly",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-week" size={24} color="white" />
          ),
        }}
      />
    </Tabs>
  );
}
