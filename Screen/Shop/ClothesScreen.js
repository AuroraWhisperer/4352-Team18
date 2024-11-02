import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Clothes from "../../components/Display/ShopProducts/Clothes";

export default function ClothesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Clothes />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF4E7",
  },
});
