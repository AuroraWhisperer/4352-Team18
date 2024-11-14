import React from "react";
import { useFonts } from "expo-font";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CallToAction({ screenName }) {
  const navigation = useNavigation();

  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Return loading state if fonts are not loaded
  if (!fontsLoaded) {
    return null;
  }

  // Function to return custom message based on the screen name
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

  // Function to navigate to a specific category in ShopTab
  const navigateToCategory = () => {
    let targetCategory;
    switch (screenName) {
      case "ClothesScreen":
        targetCategory = "Clothes";
        break;
      case "AccessoriesScreen":
        targetCategory = "Accessories";
        break;
      case "FoodScreen":
        targetCategory = "Food";
        break;
      case "ToysScreen":
        targetCategory = "Toys";
        break;
      case "FurnitureScreen":
        targetCategory = "Furniture";
        break;
      default:
        targetCategory = "Clothes";
    }

    navigation.navigate("ShopTab", { screen: targetCategory });
  };

  // Centered container to hold call-to-action message and button
  return (
    <View style={styles.centerContent}>
      <Text style={styles.callToAction}>{getTextByScreenName()}</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToCategory}>
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
    fontFamily: "MarkoOne-Regular",
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
    fontFamily: "MarkoOne-Regular",
    fontWeight: "600",
    color: "#333",
  },
});
