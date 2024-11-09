import React from "react";
import { useFonts } from "expo-font";
import { View, Text } from "react-native";

export default function CustomHeaderTitle() {
  // Load the custom font using the expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Return nothing until the font is fully loaded
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    // Centered container for the header title
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 18, fontFamily: "MarkoOne-Regular" }}>
        Home Tab
      </Text>
    </View>
  );
}
