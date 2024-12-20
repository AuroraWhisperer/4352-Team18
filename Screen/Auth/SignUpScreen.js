import React, { useState, useRef, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import DropDownPicker from "react-native-dropdown-picker";
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
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
  // ScrollView,
} from "react-native";
import { useAuth } from "../../context/AuthContext.js";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

// import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";

export default function SignUpScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedNumber || null);
  const [items, setItems] = useState([
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
  ]);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const {
    registerUser,
    setUsername,
    username,
    setEmail,
    email,
    saveSelectedNumber,
    selectedNumber,
  } = useAuth();

  useEffect(() => {
    if (selectedNumber) {
      setValue(selectedNumber);
    }
  }, [selectedNumber]);

  const handleValueChange = (newValue) => {
    // console.log("Selected value from DropDownPicker:", newValue);
    if (newValue !== null && newValue !== undefined) {
      setValue(newValue);
      saveSelectedNumber(newValue);
    } else {
      console.error("Invalid value passed to handleValueChange:", newValue);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setIsKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setUsername("");
      setPassword("");
      setEmail("");
      setValue(null);
    }, [setUsername, setEmail])
  );

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Create refs for each input field
  const passwordRef = useRef();
  const emailRef = useRef();

  const handleSignUp = async () => {
    if (username.length < 3) {
      alert("Username must be at least 3 characters in length");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    Alert.alert(
      "Confirmation",
      "Once you proceed to the next page, you cannot go back. Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: async () => {
            const newUser = { username, password, email };
            console.log("Attempting to register user:", newUser);

            const success = await registerUser(newUser);
            if (success) {
              setUsername(newUser.username);
              alert("Successful registration!");
              navigation.navigate("SignUpScreen2");
            }
          },
        },
      ]
    );
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableOpacity
          style={[styles.backContent]}
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

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 20}
          content={styles.keyboardView}
        >
          <View>
            <Text style={[styles.inputText]}>Username: </Text>
            <TextInput
              style={[styles.inputButton]}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              returnKeyType="next"
              onSubmitEditing={() => {
                if (!password) passwordRef.current.focus();
              }}
            />
          </View>

          <View>
            <Text style={[styles.inputText]}>Password: </Text>
            <TextInput
              ref={passwordRef}
              secureTextEntry={true}
              style={[styles.inputButton]}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              returnKeyType="next"
              onSubmitEditing={() => {
                if (!email) emailRef.current.focus();
              }}
            />
          </View>

          <View>
            <Text style={[styles.inputText]}>Email: </Text>
            <TextInput
              ref={emailRef}
              style={[styles.inputButton]}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              returnKeyType="done"
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
            />
          </View>

          <View>
            <Text style={[styles.inputText]}>The number of children: </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                if (isKeyboardVisible) {
                  Keyboard.dismiss();
                } else {
                  setOpen(true);
                }
              }}
            >
              <View style={{ zIndex: 1000 }}>
                <DropDownPicker
                  style={[styles.inputButton]}
                  placeholder="Select a number"
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  disabled={isKeyboardVisible}
                  onChangeValue={handleValueChange}
                  dropDownContainerStyle={{
                    maxHeight: 320,
                    position: "absolute",
                    top: -320,
                  }}
                  listMode="SCROLLVIEW"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAvoidingView>

        <TouchableOpacity style={[styles.nextButton]} onPress={handleSignUp}>
          <Text style={[styles.nextText]}>Next</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    top: Dimensions.get("window").height * 0.08,
    left: Dimensions.get("window").width * 0.05,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Dimensions.get("window").height * 0.1,
  },
  backImage: {
    width: Dimensions.get("window").width * 0.06,
    height: Dimensions.get("window").width * 0.06,
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
    marginBottom: 20,
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
    borderColor: "#fff",
    width: "80%",
    marginLeft: 35,
    zIndex: 10,
  },
  inputText: {
    fontSize: 17,
    fontFamily: "MarkoOne-Regular",
    color: "#333",
    marginLeft: 40,
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
    zIndex: 0,
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
