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
  } from "react-native";

export default function SignUpScreen3({ navigation }) {
  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Return loading state if fonts are not loaded
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <SafeAreaView style={[styles.container]}>
        <TouchableOpacity
          style={[styles.backContent]}
          onPress={() => navigation.navigate("SignUpScreen2")}
        >
          <Image
            source={require("../../assets/images/backButton.png")}
            style={styles.backImage}
          />
        </TouchableOpacity>

      <View style={[styles.content]}>
        <Text style={[styles.title]}>I'm Curious!</Text>
        <Image
          source={require("../../assets/images/blue_cat.png")}
          style={[styles.image]}
        />
        <Text style={[styles.inputText]}>Let's learn a bit about your family!</Text>
      </View>

      <TouchableOpacity
        style={[styles.nextButton]}
        onPress={() => navigation.navigate("SignUpScreen4")}
      >
        <Text style={[styles.nextText]}>Next</Text>
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
    position: "absolute",
    top: Dimensions.get("window").height * 0.07,
    left: Dimensions.get("window").width * 0.08,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Dimensions.get("window").height * 0.001,
  },
  backImage: {
    width: Dimensions.get("window").width * 0.04,
    height: Dimensions.get("window").width * 0.04,
    marginRight: 335,
  },
  title: {
    marginTop: 30,
    fontSize: 40,
    fontFamily: "MarkoOne-Regular",
  },
  image: {
    width: Dimensions.get("window").width * 0.6,
    height: Dimensions.get("window").width * 0.6,
    marginTop: 25,
  },
  inputText: {
    fontSize: 17,
    fontFamily: "MarkoOne-Regular",
    color: "#333",
    marginTop: 20,
    marginBottom: 8,
    width: "80%",
  },
  nextButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 13,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: -50,
    marginBottom: 150,
  },
  nextText: {
    fontSize: 17,
    fontFamily: "MarkoOne-Regular",
    color: "#333",
    textAlign: "center",
  },
});
