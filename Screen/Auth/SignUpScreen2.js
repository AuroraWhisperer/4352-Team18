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
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useMain } from "../../context/MainContext";

export default function SignUpScreen2({ navigation }) {
  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  const { username, updatePetname, saveUserData, updateFamilyName, email } =
    useAuth();

  // Return loading state if fonts are not loaded
  if (!fontsLoaded) {
    return null;
  }

  const [petName, setPetName] = useState("");
  const [familyName, setFamilyName] = useState("");

  const handleNext = async () => {
    try {
      if (!petName) {
        Alert.alert("Error", "Please enter a pet name.");
        return;
      }

      if (!familyName) {
        Alert.alert("Error", "Please enter a family name.");
        return;
      }
      if (!username) {
        console.log("No username found. Please register first.");
        return;
      }

      await updatePetname(petName);
      await updateFamilyName(familyName);

      await saveUserData(username, {
        petname: petName,
        familyname: familyName,
      });

      navigation.navigate("SignUpScreen3");

      console.log(
        // `Pet name: ${petName}, Family name: ${familyName}, Username: ${username}`
        `Email: ${email}, Username: ${username}`
      );
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container]}>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 290 : 290}
          style={[styles.content]}
        > */}
        <Text style={[styles.title]}>Hello!</Text>

        <Image
          source={require("../../assets/images/cat2.png")}
          style={[styles.image]}
        />
        {/* </KeyboardAvoidingView> */}

        {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 20}
          style={styles.keyboardView}
        > */}
        <View>
          <Text style={[styles.inputText]}>Name your pet: </Text>
          <TextInput
            style={[styles.inputButton]}
            placeholder="Enter your pet name"
            value={petName}
            onChangeText={setPetName}
            returnKeyType="next"
          />
        </View>

        <View>
          <Text style={[styles.inputText]}>Name your family: </Text>
          <TextInput
            style={[styles.inputButton]}
            placeholder="Enter your family name"
            value={familyName}
            onChangeText={setFamilyName}
            returnKeyType="go"
          />
        </View>
        {/* </KeyboardAvoidingView> */}

        <TouchableOpacity style={[styles.nextButton]} onPress={handleNext}>
          <Text style={[styles.nextText]}>Next</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Dimensions.get("window").height * 0.1,
  },
  backImage: {
    width: Dimensions.get("window").width * 0.04,
    height: Dimensions.get("window").width * 0.04,
    marginRight: 335,
  },
  title: {
    marginTop: 100,
    fontSize: 40,
    fontFamily: "MarkoOne-Regular",
  },
  image: {
    width: Dimensions.get("window").width * 0.6,
    height: Dimensions.get("window").width * 0.6,
    marginTop: 25,
    marginBottom: 30,
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
    marginBottom: 30,
    fontFamily: "MarkoOne-Regular",
    borderColor: "#fff",
    width: Dimensions.get("window").width * 0.8,
  },

  inputText: {
    fontSize: 17,
    fontFamily: "MarkoOne-Regular",
    color: "#333",
    marginRight: 230,
    marginBottom: 10,
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
    marginTop: 30,
    marginBottom: Dimensions.get("window").height * 0.05,
  },
  nextText: {
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
});
