import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";

export default function ShopScreen() {
  return (
    <View style={[styles.container]}>
      <Text>ShopScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
