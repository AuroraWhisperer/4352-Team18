import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CallToAction({ screenName }) {
  const navigation = useNavigation();

  const getTextByScreenName = () => {
    switch (screenName) {
      case "ClothesScreen":
        return "MEOW... \nBUY SOME CLOTHES FOR ME!";

      case "AccessoriesScreen":
        return "MEOW... \nBUY SOME ACCESSORIES \nFOR ME!";

      case "FoodScreen":
        return "MEOW... \nI'M SO HUNGRY :(";

      case "ToysScreen":
        return "MEOW...\nI WANT SOMETHING COMFY!";

      case "FurnitureScreen":
        return "MEOW... \nI'M SO BORED!";

      default:
        return "Check out our items!";
    }
  };

  return (
    <View style={styles.centerContent}>
      <Text style={styles.callToAction}>{getTextByScreenName()}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ShopTab")}
      >
        <Text style={styles.buttonText}>Go shopping</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // top: Dimensions.get("window").height * 0.02,
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
