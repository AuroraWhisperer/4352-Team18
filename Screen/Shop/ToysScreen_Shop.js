import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Toys from "../../components/Display/ShopProducts/Toys";

export default function ToysScreen_Shop() {
  return (
    <SafeAreaView style={styles.container}>
      <Toys />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF4E7",
  },
});
