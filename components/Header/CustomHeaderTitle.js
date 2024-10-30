import React from "react";
import { useFonts } from "expo-font";
import { View, Text } from "react-native";

export default function CustomHeaderTitle() {
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 18, fontFamily: "MarkoOne-Regular" }}>
        Home Tab
      </Text>
    </View>
  );
}
