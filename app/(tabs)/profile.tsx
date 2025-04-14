import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    firstName: "Zumar",
    lastName: "Syed Bukhari",
    email: "zumarawesome@gmail.com",
    location: "Home",
  });

  const handleChange = (key: keyof typeof profile, value: string) => {
    setProfile({ ...profile, [key]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Profile</Text>

        <Image
          source={{
            uri: "https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain",
          }}
          style={styles.avatar}
        />

        {[
          { label: "First Name", key: "firstName" },
          { label: "Last Name", key: "lastName" },
          { label: "Email", key: "email" },
          { label: "Location", key: "location" },
        ].map(({ label, key }) => (
          <View key={key} style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={styles.input}
              value={profile[key as keyof typeof profile]}
              onChangeText={(text) =>
                handleChange(key as keyof typeof profile, text)
              }
              placeholder={label}
              placeholderTextColor="#94A3B8"
            />
          </View>
        ))}

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save Profile Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#3A7BD5",
    justifyContent: "flex-start",
    paddingTop: 80, // 👈 Adds vertical spacing
    paddingHorizontal: 20,
  },
  inner: {
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 30,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    color: "#E2E8F0",
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    marginTop: 24,
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
