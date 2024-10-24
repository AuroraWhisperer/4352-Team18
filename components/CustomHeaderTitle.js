import React from "react";
import { useFonts } from 'expo-font';
import { View, Text } from "react-native";

export default function CustomHeaderTitle() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 18, fontFamily: 'MarkoOne-Regular' }}>Home Tab</Text>
    </View>
  );
}
