import React, { useState } from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function FamilyCodeScreen({ navigation }) {
  // Load the custom font using the expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // State to hold family code input
  const [familyCodeInput, setFamilyCodeInput] = useState("");
  const { handleFamilyCode, currentUser } = useAuth();
  // Display loading state if fonts aren't loaded
  if (!fontsLoaded) {
    return null;
  }

  const handleSubmit = async () => {
    if (!familyCodeInput) {
      Alert.alert("Error", "Please enter a family code.");
      return;
    }

    const loginSuccess = await handleFamilyCode(familyCodeInput);
    if (loginSuccess) {
      Alert.alert("Success", "Logged in successfully!");
      navigation.navigate("HomeScreen"); // Navigate to HomeScreen on successful login
    } else {
      Alert.alert("Error", "Invalid family code. Please try again.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container]}>
        <TouchableOpacity
          style={[styles.backContent]}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../../assets/images/backButton.png")}
            style={styles.backImage}
          />
        </TouchableOpacity>

        {/* Display logo and title */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 200 : 200}
          style={styles.imageKeyboardView}
        >
          <View style={[styles.content]}>
            <Image
              source={require("../../assets/images/StartScreenImage.png")}
              style={styles.image}
            />
            <Text style={[styles.title]}>PetConnect</Text>
          </View>
        </KeyboardAvoidingView>

        {/* Family Code input fields */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 20}
          style={styles.keyboardView}
        >
          {/* Family Code input */}
          <View>
            <Text style={[styles.inputText]}>Enter family Code: </Text>
            <TextInput
              style={[styles.inputButton]}
              placeholder="Enter your family code"
              value={familyCodeInput}
              onChangeText={setFamilyCodeInput}
            />
          </View>
        </KeyboardAvoidingView>

        {/* Submit button */}
        <TouchableOpacity style={[styles.signButton]} onPress={handleSubmit}>
          <Text style={[styles.signText]}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Dimensions.get("window").height * 0.2,
  },
  backImage: {
    width: Dimensions.get("window").width * 0.04,
    height: Dimensions.get("window").width * 0.04,
    marginRight: 335,
  },
  image: {
    width: Dimensions.get("window").width * 0.33,
    height: Dimensions.get("window").width * 0.33,
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontFamily: "MarkoOne-Regular",
    marginTop: 10,
    marginBottom: 10,
  },
  inputButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
    fontFamily: "MarkoOne-Regular",
  },
  inputText: {
    fontSize: 17,
    fontFamily: "MarkoOne-Regular",
    color: "#333",
    marginRight: 230,
    marginBottom: 8,
    width: "80%",
  },
  signButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 13,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 150,
  },
  signText: {
    fontSize: 17,
    fontFamily: "MarkoOne-Regular",
    color: "#333",
    textAlign: "center",
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
    width: Dimensions.get("window").width * 0.8,
    paddingHorizontal: 30,
  },
  imageKeyboardView: {
    flex: 1,
    justifyContent: "center",
    width: Dimensions.get("window").width * 0.8,
    paddingHorizontal: 30,
    marginBottom: 50,
  },
});
