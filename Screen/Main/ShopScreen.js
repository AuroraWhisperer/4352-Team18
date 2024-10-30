import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import React, { Component } from "react";

export default function ShopScreen() {
  return (
    <SafeAreaView style={[styles.container]}>
      <Text>ShopScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7E4C6",
  },
});
