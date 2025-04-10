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
import { useRouter } from 'expo-router';

export default function profile() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.profiletext}>Profile</Text>
            <Image source={{uri: 'https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain'}}
       style={{width: 200, height: 200}} />
            <Text style={styles.labeltext}>First Name: </Text>
            <TextInput
        style={styles.editproperties}
        placeholder="Zumar"
      />
            <Text style={styles.labeltext}>Last Name: </Text>
            <TextInput
        style={styles.editproperties}
        placeholder="Syed Bukhari"
      />
            <Text style={styles.labeltext}>Email: </Text>
            <TextInput
        style={styles.editproperties}
        placeholder="zumarawesome@gmail.com"
      />
            <Text style={styles.labeltext}>Location: </Text>
            <TextInput
        style={styles.editproperties}
        placeholder="Home"
      />
            <TouchableOpacity style={styles.edit}>
                      <Text style={styles.edittext}>Save Profile Changes</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      color: "black",
      backgroundColor: '#3A7BD5',
      fontSize: 16,
      fontWeight: "bold",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    profiletext: {
        color: "#fff",
        fontSize: 45,
        fontWeight: "bold",
    },
    returnButton: {
        backgroundColor: "green",
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginVertical: 10,
        padding: 12,
        borderRadius: 20,
        width: 300,
        alignItems: "center",
        marginTop: 10,
      },
      returnText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
      },
      edit: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginVertical: 10,
        padding: 12,
        borderRadius: 8,
        width: 300,
        alignItems: "center",
        marginTop: 10,
      },
      edittext: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
      },
      editproperties: {
        height: 40, 
        padding: 5
      },
      labeltext: {
        color: "#64748B",
      }
  });
//https://reactnative.dev/docs/handling-text-input
//https://reactnative.dev/docs/images
//https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain
