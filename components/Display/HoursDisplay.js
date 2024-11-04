import React from "react";
import { useFonts } from "expo-font";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function HoursDisplay({ hours = 0 }) {
  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Display nothing until the font is fully loaded
  if (!fontsLoaded) {
    return undefined;
  }

  // TouchableOpacity to make the hours display clickable (future functionality potential)
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>Hours spent today: {hours} hr</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: "center",
  },
  text: {
    fontFamily: "MarkoOne-Regular",
    fontSize: 18,
    fontWeight: "500",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
