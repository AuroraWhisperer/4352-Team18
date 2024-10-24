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
} from "react-native";

export default function StartPage({ navigation }) {
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signInDisabled = !username || !password;

  return (
    <SafeAreaView style={[styles.container]}>
      <TouchableOpacity
        Style={[styles.backContent]}
        onPress={() => navigation.navigate("StartPage")}
      >
        <Image
          source={require("../../assets/images/backButton.png")}
          style={styles.backImage}
        />
      </TouchableOpacity>

      <View style={[styles.content]}>
        <Image
          source={require("../../assets/images/StartScreenImage.png")}
          style={styles.image}
        />

        <Text style={[styles.title]}>PetConnect</Text>
      </View>

      <KeyboardAvoidingView behavior="padding">
        <View>
          <Text style={[styles.inputText]}>Username: </Text>
          <TextInput
            style={[styles.inputButton]}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View>
          <Text style={[styles.inputText]}>Password: </Text>
          <TextInput
            secureTextEntry={true}
            style={[styles.inputButton]}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </KeyboardAvoidingView>

      <TouchableOpacity
        style={[styles.signButton]}
        disabled={signInDisabled}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Text style={[styles.signText]}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.forgotPasswordButton]}
        //onPress={() => navigation.navigate("StartPage")}
      >
        <Text style={[styles.forgotPasswordText]}>Forgot password?</Text>
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
    paddingVertical: 13,
    paddingHorizontal: 30,
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
});
