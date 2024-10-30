import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useApp } from "../../context/AppContext";

export default function TaskComponent({ initialDiamonds }) {
  const [diamonds, setDiamonds] = useState(initialDiamonds);
  const { addToTotalDiamonds } = useApp();

  const completeTask = () => {
    addToTotalDiamonds(diamonds);
    setDiamonds(0);
  };

  return (
    <View style={styles.container}>
      <Text>Task Reward Diamonds: {diamonds}</Text>
      <TouchableOpacity onPress={completeTask} style={styles.button}>
        <Text>Complete Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  button: {

  },
});
