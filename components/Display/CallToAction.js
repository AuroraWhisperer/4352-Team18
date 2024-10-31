import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CallToAction = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.centerContent}>
      <Text style={styles.callToAction}>MEOW... BUY SOME CLOTHES FOR ME!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ShopTab")}
      >
        <Text style={styles.buttonText}>Go shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  callToAction: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});

export default CallToAction;
