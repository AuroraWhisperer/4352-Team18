import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Clipboard,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUpScreen6({ navigation }) {
  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Return loading state if fonts are not loaded
  if (!fontsLoaded) {
    return null;
  }

  const { username, saveUserData, familyCode, setFamilyCode } = useAuth();

  // Generate a random family code
  const generateRandomCode = () => {
    const letters = Array.from({ length: 4 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join("");
    const digits = Math.floor(100 + Math.random() * 900).toString();
    return `${letters}${digits}`;
  };

  const copyToClipboard = () => {
    Clipboard.setString(familyCode);
    Alert.alert('Copied!', 'Family code copied to clipboard.');
  };

  useEffect(() => {
    const fetchOrGenerateFamilyCode = async () => {
      try {
        const userDataString = await AsyncStorage.getItem(`data_${username}`);
        const userData = userDataString ? JSON.parse(userDataString) : {};

        if (userData.familyCode) {
          setFamilyCode(userData.familyCode);
          console.log(
            `Using existing familyCode for ${username}: ${userData.familyCode}`
          );
        } else {
          const newCode = generateRandomCode();
          setFamilyCode(newCode);
          await saveUserData(username, { ...userData, familyCode: newCode });
          console.log(
            `Generated and saved new familyCode for ${username}: ${newCode}`
          );
        }
      } catch (error) {
        console.error(
          "Error while generating or retrieving family code:",
          error
        );
      }
    };

    if (username && !familyCode) {
      fetchOrGenerateFamilyCode();
    }
  }, [username, familyCode]);

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.content]}>
        <Text style={[styles.title]}>Welcome to PetConnect!</Text>
        <Image
          source={require("../../assets/images/green_cat.png")}
          style={[styles.image]}
        />
        <Text style={[styles.inputText]}>Thank you for your information!</Text>
      </View>

      <View>
        <Text style={[styles.codeTitle]}>Family Code: </Text>

        <View style={[styles.codeButton]}>
        <TouchableOpacity onPress={copyToClipboard}>
            <Text style={[styles.codeText]}>{familyCode}</Text>
        </TouchableOpacity>
        </View>
      </View>

      <Text style={[styles.shareText]}>
        Share this code with your family members.
      </Text>

      <TouchableOpacity
        style={[styles.nextButton]}
        onPress={() => navigation.navigate("StartPage")}
      >
        <Text style={[styles.nextText]}>Go to Sign In</Text>
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Dimensions.get("window").height * 0.1,
  },
  backContent: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: Dimensions.get("window").height * 0.07,
    left: Dimensions.get("window").width * 0.08,
  },
  backImage: {
    width: Dimensions.get("window").width * 0.04,
    height: Dimensions.get("window").width * 0.04,
    marginRight: 335,
  },
  title: {
    marginTop: 30,
    fontSize: 38,
    fontFamily: "MarkoOne-Regular",
  },
  image: {
    width: Dimensions.get("window").width * 0.55,
    height: Dimensions.get("window").width * 0.55,
    marginTop: 25,
  },
  inputText: {
    fontSize: 18,
    fontFamily: "MarkoOne-Regular",
    color: "#333",
    marginTop: 25,
    marginBottom: 5,
    width: "80%",
  },
  codeTitle: {
    marginTop: 100,
    fontSize: 35,
    fontFamily: "MarkoOne-Regular",
  },
  codeButton: {
    backgroundColor: "#EDF0F7",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 15,
  },
  codeText: {
    fontSize: 35,
    fontFamily: "MarkoOne-Regular",
    color: "#333",
    textAlign: "center",
  },
  shareText: {
    fontSize: 13,
    fontFamily: "MarkoOne-Regular",
    color: "#616161",
    marginTop: 10,
    marginBottom: 30,
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
    marginTop: 10,
    marginBottom: 50,
  },
  nextText: {
    fontSize: 17,
    fontFamily: "MarkoOne-Regular",
    color: "#333",
    textAlign: "center",
  },
});