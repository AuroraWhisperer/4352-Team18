import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const PocketHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Welcome to {"\n"}Luna's pocket!</Text>
      <Image
        source={require("../../assets/images/StartScreenImage.png")}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    padding: 16,
    paddingTop: Dimensions.get("window").height * 0.05,
    backgroundColor: "#F7E4C6",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 75,
    marginBottom: Dimensions.get("window").height * 0.02,
  },
});

export default PocketHeader;
