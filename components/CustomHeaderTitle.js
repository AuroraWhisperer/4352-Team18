import React from "react";
import { useFonts } from 'expo-font';
import { View, Text } from "react-native";

export default function CustomHeaderTitle() {
  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Return loading state if fonts are not loaded
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 18, fontFamily: 'MarkoOne-Regular' }}>Home Tab</Text>
    </View>
  );
}
