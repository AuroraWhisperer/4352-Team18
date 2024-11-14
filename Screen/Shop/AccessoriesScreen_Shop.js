import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Accessories from "../../components/Display/ShopProducts/Accessories";

export default function AccessoriesScreen_Shop() {
  return (
    <SafeAreaView style={styles.container}>
      <Accessories />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF4E7",
  },
});
