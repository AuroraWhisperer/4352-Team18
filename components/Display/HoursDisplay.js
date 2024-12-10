import React, { useContext } from "react";
import { useFonts } from "expo-font";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MainContext } from "../../context/MainContext";

export default function HoursDisplay() {

  const { totalTime } = useContext(MainContext);

  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hours spent total: {totalTime} hr</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: "center",
  },
  text: {
    fontFamily: "MarkoOne-Regular",
    fontSize: 18,
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
