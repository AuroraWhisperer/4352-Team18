import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Furniture from "../../components/Display/ShopProducts/Furniture";

export default function FurnitureScreen_Shop() {
  return (
    <SafeAreaView style={styles.container}>
      <Furniture />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF4E7",
  },
});
