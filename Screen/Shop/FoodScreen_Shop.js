import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Food from "../../components/Display/ShopProducts/Food";

export default function FoodScreen_Shop() {
  return (
    <SafeAreaView style={styles.container}>
      <Food />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF4E7",
  },
});
