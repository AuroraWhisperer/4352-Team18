import React from "react";
import { useFonts } from "expo-font";
import { View, Text, Image, StyleSheet } from "react-native";
import { useMain } from "../../context/MainContext";

export default function TotalDiamonds({ style, textStyle, imageStyle }) {
  const { totalDiamonds } = useMain();

  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Return loading state if fonts are not loaded
  if (!fontsLoaded) {
    return undefined;
  }

  // Main container with custom styles for displaying diamond count
  return (
    <View style={[styles.currency, style]}>
      <Image
        source={require("../../assets/images/diamond.png")}
        style={[styles.diamond, imageStyle]}
      />
      <Text style={[styles.currencyText, textStyle]}>{totalDiamonds}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  currency: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  currencyText: {
    fontFamily: "MarkoOne-Regular",
    marginLeft: 15,
    fontSize: 16,
    marginRight: 5,
  },
  diamond: {
    width: 20,
    height: 20,
  },
});
