import React, { useState, useRef } from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  // SafeAreaView,
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
import { SafeAreaView } from "react-native-safe-area-context";


export default function SignInScreen1({ navigation }) {
  // Load the custom font using the expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Access authentication functions and state from AuthContext
  const { username, setUsername, handleAdminLogin, handleUserLogin } =
    useAuth();
  const [password, setPassword] = useState("");
  const passwordInputRef = useRef(null);

  // Disable sign-in button if username or password is empty
  const signInDisabled = !username || !password;

  // Handle sign-in when the button is pressed
  const handleSignIn = async () => {
    try {
      const isAdmin = await handleAdminLogin(username, password);
      if (isAdmin) {
        Alert.alert("Login Success", "Welcome, Admin!", [
          { text: "OK", onPress: () => navigation.navigate("HomeScreen") },
        ]);
      } else {
        const isUser = await handleUserLogin(username, password);
        if (isUser) {
          Alert.alert("Login Success", "Welcome!", [
            { text: "OK", onPress: () => navigation.navigate("HomeScreen") },
          ]);
        } else {
          Alert.alert("Login Failed", "Invalid username or password", [
            {
              text: "Sign Up",
              onPress: () => navigation.navigate("StartPage"),
            },
            { text: "Try Again" },
          ]);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Login Failed", "An error occurred during login.");
    }
  };

  // Display loading state if fonts aren't loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container]}>
        <TouchableOpacity
          style={[styles.backContent]}
          // onPress={() => navigation.goBack()}
          onPress={() => navigation.navigate("StartPage")}
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

        {/* Username and password input fields */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 20}
          style={styles.keyboardView}
        >
          {/* Username input */}
          <View>
            <Text style={[styles.inputText]}>Username: </Text>
            <TextInput
              style={[styles.inputButton]}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              returnKeyType="next"
              onSubmitEditing={() => {
                if (!password) {
                  passwordInputRef.current && passwordInputRef.current.focus();
                } else if (!signInDisabled) {
                  handleSignIn();
                }
              }}
            />
          </View>

          {/* Password input */}
          <View>
            <Text style={[styles.inputText]}>Password: </Text>
            <TextInput
              ref={passwordInputRef}
              secureTextEntry={true}
              style={[styles.inputButton]}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              returnKeyType="go"
              onSubmitEditing={() => {
                if (!signInDisabled) {
                  handleSignIn();
                }
              }}
            />
          </View>
        </KeyboardAvoidingView>

        {/* Sign-in button */}
        <TouchableOpacity
          style={[styles.signButton]}
          disabled={signInDisabled}
          onPress={handleSignIn}
        >
          <Text style={[styles.signText]}>Sign In</Text>
        </TouchableOpacity>

        {/* Forgot password link */}
        <TouchableOpacity style={[styles.forgotPasswordButton]}>
          <Text style={[styles.forgotPasswordText]}>Forgot password?</Text>
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
    paddingTop: Dimensions.get("window").height * 0.1,
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
    marginBottom: 50,
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
    marginBottom: 25,
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
    marginBottom: 20,
  },
  signText: {
    fontSize: 17,
    fontFamily: "MarkoOne-Regular",
    color: "#333",
    textAlign: "center",
  },
  forgotPasswordButton: {
    marginBottom: Dimensions.get("window").height * 0.18,
  },
  forgotPasswordText: {
    textDecorationLine: "underline",
    fontFamily: "MarkoOne-Regular",
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
