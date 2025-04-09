import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
export default function WeatherApp() {
  const [cities, setCities] = useState([
    { name: "Tehran", temperature: "12", time: "10:00 AM", icon: "⛅️" },
    { name: "Dubai", temperature: "31", time: "3:00 PM", icon: "☀️" },
    { name: "London", temperature: "8", time: "5:30 PM", icon: "🌧️" },
    { name: "New York", temperature: "4", time: "9:15 AM", icon: "🌤️" },
    { name: "Tehran", temperature: "12", time: "10:00 AM", icon: "⛅️" },
    { name: "Dubai", temperature: "31", time: "3:00 PM", icon: "☀️" },
    { name: "London", temperature: "8", time: "5:30 PM", icon: "🌧️" },
    { name: "New York", temperature: "4", time: "9:15 AM", icon: "🌤️" },
  ]);
  const [showSearch, setShowSearch] = useState(false);
  const [newName, setNewName] = useState("");
  const [newTemp, setNewTemp] = useState("");
  const [newTime, setNewTime] = useState("");
  // Will adjust this later for api calls
  // const toggleSearch = () => setShowSearch(!showSearch);
  // const addCity = () => {
  //   if (newName.trim() && newTemp.trim() && newTime.trim()) {
  //     setCities([
  //       ...cities,
  //       { name: newName, temperature: newTemp, time: newTime, icon: "❓" },
  //     ]);
  //     setNewName("");
  //     setNewTemp("");
  //     setNewTime("");
  //     setShowSearch(false);
  //   }
  // };
  const deleteCity = (i: number) => {
    let updated = [...cities];
    updated.splice(i, 1);
    setCities(updated);
  };
  const router = useRouter();
  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.headerTitle}>Weather</Text>
        <TouchableOpacity style={s.plusButton}>
          <Text style={s.plusIcon}>+</Text>
        </TouchableOpacity>
      </View>
      {showSearch && (
        <View style={s.searchContainer}>
          <TextInput
            style={s.searchInput}
            placeholder="City Name"
            value={newName}
            onChangeText={setNewName}
          />
          <TextInput
            style={s.searchInput}
            placeholder="Temperature"
            value={newTemp}
            onChangeText={setNewTemp}
          />
          <TextInput
            style={s.searchInput}
            placeholder="Time"
            value={newTime}
            onChangeText={setNewTime}
          />
          <TouchableOpacity style={s.addButton}>
            <Text style={s.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView style={s.list} showsVerticalScrollIndicator={false}>
        {cities.map((c, i) => (
          <View
            key={i}
            style={[
              s.weatherItem,
              i === cities.length - 1 ? { borderBottomWidth: 0 } : null,
            ]}
          >
            <TouchableOpacity
              onPress={() => deleteCity(i)}
              style={s.deleteButton}
            >
              <Text style={s.deleteText}>x</Text>
            </TouchableOpacity>
            <View style={s.itemRow}>
              <View>
                <View style={s.tempRow}>
                  <Text style={s.temperature}>{c.temperature}</Text>
                  <Text style={s.degreeSymbol}>°</Text>
                </View>
                <Text style={s.cityName}>{c.name}</Text>
                <Text style={s.timeText}>{c.time}</Text>
              </View>
              <View style={s.rightSide}>
                <Text style={s.weatherIcon}>{c.icon}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3a7bd5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  plusButton: { padding: 10 },
  plusIcon: { fontSize: 28, color: "#fff" },
  searchContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  addButton: {
    alignSelf: "flex-end",
    backgroundColor: "#ffcc00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: { fontWeight: "bold" },
  list: { flex: 1 },
  weatherItem: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingVertical: 20,
    minHeight: 120,
    position: "relative",
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 0,
    zIndex: 1,
    padding: 5,
  },
  deleteText: { fontSize: 16, color: "#fff" },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tempRow: { flexDirection: "row", alignItems: "flex-start" },
  temperature: { fontSize: 70, fontWeight: "bold", color: "#fff" },
  degreeSymbol: {
    fontSize: 18,
    fontWeight: "300",
    color: "#fff",
    marginTop: 10,
    marginLeft: 2,
  },
  cityName: {
    fontSize: 20,
    fontWeight: "400",
    color: "#fff",
    marginVertical: 5,
  },
  returnButton: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginVertical: 10,
    padding: 12,
    borderRadius: 20,
    width: 200,
    alignItems: "center",
    marginTop: 10,
  },
  returnText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  timeText: { fontSize: 12, color: "#fff" },
  rightSide: { alignItems: "flex-end", marginRight: 10 },
  weatherIcon: { fontSize: 70, color: "#fff" },
});
