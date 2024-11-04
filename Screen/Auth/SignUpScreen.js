import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import DropDownPicker from 'react-native-dropdown-picker';
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
} from "react-native";
import { useApp } from "../../context/AppContext.js";

export default function SignUpScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  const [ username, setUsername ] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
  ]);

  const handleSignUp = async (email, password) => {
    try {
      const user = { email, password };
      await AsyncStorage.setItem("user", JSON.stringify(user));
      alert("Registration Successful");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container]}>
        <TouchableOpacity
          style={[styles.backContent]}
          onPress={() => navigation.navigate("StartPage")}
        >
          <Image
            source={require("../../assets/images/backButton.png")}
            style={styles.backImage}
          />
        </TouchableOpacity>
          
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 20}
          style={styles.keyboardView}
        >
          <View style={[styles.content]}>
            <Image
              source={require("../../assets/images/StartScreenImage.png")}
              style={styles.image}
            />
            <Text style={[styles.title]}>PetConnect</Text>
          </View>
        </KeyboardAvoidingView>
        
          
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 20}
          style={styles.keyboardView}
        >
          <View>
            <Text style={[styles.inputText]}>Username: </Text>
            <TextInput
              style={[styles.inputButton]}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              returnKeyType="next"
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
              returnKeyType="next"
            />
          </View>

          <View>
            <Text style={[styles.inputText]}>Email: </Text>
            <TextInput
              secureTextEntry={true}
              style={[styles.inputButton]}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              returnKeyType="go"
            />
          </View>
          

          <View>
            <Text style={[styles.inputText]}>The number of children: </Text>
            <DropDownPicker
              style={[styles.inputButton]}
              placeholder="Select a number"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
          </KeyboardAvoidingView>
        

        <TouchableOpacity
          style={[styles.nextButton]}
          onPress={() => navigation.navigate("SignUpScreen2")}
        >
          <Text style={[styles.nextText]}>Next</Text>
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
    marginTop: -20,
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
    borderColor: '#fff',
  },
  inputText: {
    fontSize: 17,
    fontFamily: "MarkoOne-Regular",
    color: "#333",
    marginRight: 230,
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
    marginTop: 40,
    marginBottom: 20,
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
  imageKeyboardView: {
    flex: 1,
    justifyContent: "center",
    width: Dimensions.get("window").width * 0.8,
    paddingHorizontal: 30,
    marginBottom: 50,
  },
});
