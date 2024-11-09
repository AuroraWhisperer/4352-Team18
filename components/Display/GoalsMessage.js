import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useMain } from "../../context/MainContext";
import { useNavigation } from "@react-navigation/native";

export default function GoalsMessage({ onPress }) {
  const { goals } = useMain();
  const navigation = useNavigation();

  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Return loading state if fonts are not loaded
  if (!fontsLoaded) {
    return undefined;
  }

  // Effect hook to watch for changes in the goals array
  useEffect(() => {}, [goals]);

  // Function to handle button press
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

  // TouchableOpacity to make the message clickable, triggers handlePress on press
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
    fontFamily: "MarkoOne-Regular",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});
