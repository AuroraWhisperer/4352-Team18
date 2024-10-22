import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";

export default function PocketScreen() {
  return (
    <View style={[styles.container]}>
      <Text>PocketScreen</Text>
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
