<<<<<<< Updated upstream
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

=======
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

>>>>>>> Stashed changes
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const iconColor = "white";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
<<<<<<< Updated upstream
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
=======
          ios: { position: "absolute", borderTopWidth: 0 },
          android: { elevation: 0 },
>>>>>>> Stashed changes
        }),
      }}>
      <Tabs.Screen
        name="explore"
        options={{
<<<<<<< Updated upstream
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
=======
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
>>>>>>> Stashed changes
        }}
      />
    </Tabs>
  );
}
