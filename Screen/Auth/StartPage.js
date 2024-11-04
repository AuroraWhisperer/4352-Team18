import React from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function StartPage({ navigation }) {
  // Load custom fonts using expo-font
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // If fonts are not loaded, return undefined to show loading state
  if (!fontsLoaded) {
    return undefined;
  }

  const { clearAsyncStorage } = useAuth();

  // Show confirmation alert before clearing local storage
  const handleClearStoragePress = () => {
    Alert.alert(
      "Clear Storage",
      "Sure you want to clear your local storage?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "verify", onPress: clearAsyncStorage },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={[styles.container]}>
      {/* Back button to return to the previous screen */}
      <TouchableOpacity
        style={[styles.backContent]}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../../assets/images/backButton.png")}
          style={styles.backImage}
        />
      </TouchableOpacity>

      {/* Button to clear local storage */}
      <TouchableOpacity
        style={styles.clearButton}
        onPress={handleClearStoragePress}
      >
        <Text style={styles.clearButtonText}>Clear Local Storage</Text>
      </TouchableOpacity>

      {/* App logo and title */}
      <View style={[styles.content]}>
        <Image
          source={require("../../assets/images/StartScreenImage.png")}
          style={styles.image}
        />

        <Text style={[styles.title]}>PetConnect</Text>
      </View>

      {/* Sign In button */}
      <TouchableOpacity
        style={[styles.signButton]}
        onPress={() => navigation.navigate("SignInScreen1")}
      >
        <Text style={[styles.signText]}>Sign In</Text>
      </TouchableOpacity>

      {/* Sign Up button */}
      <TouchableOpacity 
        style={[styles.signButton]}
        onPress={() => navigation.navigate("SignUpScreen")}
      >
        <Text style={[styles.signText]}>Sign Up For Family</Text>
      </TouchableOpacity>

      {/* Button for entering a family code */}
      <TouchableOpacity style={[styles.familyCodeButton]}>
        <Text style={[styles.familyCodeText]}>Have a family code?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5EDA7",
  },
  backContent: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "flex-start",
    position: "absolute",
    top: Dimensions.get("window").height * 0.07,
    left: Dimensions.get("window").width * 0.08,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Dimensions.get("window").height * 0.1,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  clearButton: {
    backgroundColor: "#E1DCA1",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    position: "absolute",
    top: Dimensions.get("window").height * 0.065,
    right: Dimensions.get("window").width * 0.04,
  },
  clearButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  image: {
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.5,
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 40,
    fontFamily: "MarkoOne-Regular",
    marginTop: 10,
    marginBottom: 50,
  },
  signButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 13,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  signText: {
    fontSize: 25,
    fontFamily: "MarkoOne-Regular",
    color: "#333",
    textAlign: "center",
  },
  familyCodeButton: {
    marginBottom: Dimensions.get("window").height * 0.18,
  },
  familyCodeText: {
    textDecorationLine: "underline",
    fontFamily: "MarkoOne-Regular",
  },
});
