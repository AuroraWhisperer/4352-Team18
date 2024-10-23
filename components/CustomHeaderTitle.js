import React from "react";
import { View, Text } from "react-native";

export default function CustomHeaderTitle() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Home Tab</Text>
    </View>
  );
}
