import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useGoals } from "../context/GoalContext";

export default function GoalsMessage({ onPress }) {
  const { goals } = useGoals();

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.message]}>
        {goals.length > 0 ? "Upcoming Goals" : "No Upcoming Goals"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  message: {
    fontSize: 16,
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});
