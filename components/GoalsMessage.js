import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useGoals } from "../context/GoalContext"; // 引入 GoalContext

export default function GoalsMessage({ onPress }) {
  const { goals } = useGoals(); // 从全局状态中获取 goals

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.message}>
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
