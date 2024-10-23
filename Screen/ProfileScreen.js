import { Text, StyleSheet, View } from 'react-native'
import { useFonts } from 'expo-font';
import React, { Component } from 'react'

export default function ProfileScreen() {
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../assets/fonts/MarkoOne-Regular.ttf")
  });

  if (!fontsLoaded) {
    return undefined;
  }
  
    return (
      <View style={[styles.container]}>
        <Text>ProfileScreen</Text>
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