import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import React, { Component } from "react";

export default function PocketScreen() {
  return (
    <SafeAreaView style={[styles.container]}>
      <Text>PocketScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7E4C6",
  },
});
