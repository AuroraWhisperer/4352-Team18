import React from "react";
import { useFonts } from "expo-font";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  // SafeAreaView,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { useAuth } from "../../context/AuthContext";

// PocketHeader component that displays a welcome message and an image at the top of the screen
const PocketHeader = () => {
  const { petname } = useAuth();

  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Return loading state if fonts are not loaded
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.title}>
        Welcome to {"\n"}
        {petname}'s pocket!
      </Text>
      <Image
        source={require("../../assets/images/StartScreenImage.png")}
        style={styles.image}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F7E4C6",
  },
  title: {
    fontSize: 20,
    fontFamily: "MarkoOne-Regular",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    paddingTop: Dimensions.get("window").height * 0.03,
  },
  image: {
    width: Dimensions.get("window").width * 0.6,
    height: Dimensions.get("window").width * 0.6,
    borderRadius: 75,
    marginBottom: Dimensions.get("window").height * 0.02,
  },
});

export default PocketHeader;
