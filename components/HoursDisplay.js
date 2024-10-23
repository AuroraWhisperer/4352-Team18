import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function HoursDisplay({ hours = 0 }) {
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
    fontSize: 20,
    fontWeight: "500",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});