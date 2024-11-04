import React from "react";
import { useFonts } from 'expo-font';
import { View, Text, Image, StyleSheet } from "react-native";

export default function CurrencyDisplay({ value = 100 }) {
  return (
    <View style={[styles.currency]}>
      <Image
        source={require("../assets/images/diamond.png")}
        style={[styles.diamond]}
      />
      <Text style={[styles.currencyText]}>{value}</Text>
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
    fontFamily: 'MarkoOne-Regular',
    marginLeft: 15,
    fontSize: 16,
    marginRight: 5,
    fontWeight: "700",
  },
  diamond: {
    width: 20,
    height: 20,
  },
});
