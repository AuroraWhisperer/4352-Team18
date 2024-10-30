import React from "react";
import { Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useApp } from "../../context/AppContext";
import { useNavigation } from "@react-navigation/native";

export default function GoalsMessage({ onPress }) {
  const { goals } = useApp();
  const navigation = useNavigation();

  const handlePress = () => {
    if (goals.length === 0) {
      Alert.alert("No Upcoming Goals", "You have no upcoming goals.", [
        {
          text: "Add Goal",
          onPress: () => navigation.navigate("GoalsTab"),
        },
      ]);
    } else {
      Alert.alert("Upcoming Goals", "You have upcoming goals.");
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
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
