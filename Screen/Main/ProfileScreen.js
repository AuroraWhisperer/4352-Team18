import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default function ProfileScreen() {
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