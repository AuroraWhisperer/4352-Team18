import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import Checkbox from "expo-checkbox";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useAuth } from "../../context/AuthContext.js";

export default function SignUpScreen5({ navigation }) {
  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Return loading state if fonts are not loaded
  if (!fontsLoaded) {
    return undefined;
  }

  const { selectedNumber } = useAuth();
  const [checkedList, setCheckedList] = useState([]);

  const handleCheckboxChange = (key) => {
    const currentIndex = checkedList.indexOf(key);
    const maxSelections = parseInt(selectedNumber, 10);

    if (currentIndex !== -1) {
      setCheckedList(checkedList.filter((item) => item !== key));
    } else {
      if (checkedList.length < maxSelections) {
        setCheckedList([...checkedList, key]);
      } else {
        setCheckedList([...checkedList.slice(1), key]);
      }
    }
  };

  const nextDisabled = checkedList.length === 0;

  return (
    <SafeAreaView style={[styles.container]}>
      <TouchableOpacity
        style={[styles.backContent]}
        onPress={() => navigation.navigate("SignUpScreen4")}
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
        <Text style={[styles.inputText]}>What's your child's gender?</Text>
        <Text style={[styles.input2Text]}>
          (You can select multiple if you have more than one child)
        </Text>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.section}
          onPress={() => handleCheckboxChange("male")}
        >
          <Checkbox
            style={styles.checkbox}
            value={checkedList.includes("male")}
            onValueChange={() => handleCheckboxChange("male")}
          />
          <Text style={styles.optionText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.section}
          onPress={() => handleCheckboxChange("female")}
        >
          <Checkbox
            style={styles.checkbox}
            value={checkedList.includes("female")}
            onValueChange={() => handleCheckboxChange("female")}
          />
          <Text style={styles.optionText}>Female</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.section}
          onPress={() => handleCheckboxChange("nonbinary")}
        >
          <Checkbox
            style={styles.checkbox}
            value={checkedList.includes("nonbinary")}
            onValueChange={() => handleCheckboxChange("nonbinary")}
          />
          <Text style={styles.optionText}>Non-binary</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.nextButton]}
        disabled={nextDisabled}
        onPress={() => navigation.navigate("SignUpScreen6")}
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Dimensions.get("window").height * 0.3,
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
    marginTop: 120,
    fontSize: 30,
    fontFamily: "MarkoOne-Regular",
  },
  image: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").width * 0.4,
    marginTop: 25,
  },
  inputText: {
    fontSize: 17,
    fontFamily: "MarkoOne-Regular",
    color: "#333",
    marginTop: 25,
    marginBottom: 5,
    width: "80%",
    textAlign: "center",
  },
  input2Text: {
    fontSize: 12,
    fontFamily: "MarkoOne-Regular",
    marginBottom: 120,
    textAlign: "center",
  },
  checkboxContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
    marginTop: 180,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    fontFamily: "MarkoOne-Regular",
  },
  checkbox: {
    margin: 8,
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
    marginBottom: 80,
  },
  nextText: {
    fontSize: 17,
    fontFamily: "MarkoOne-Regular",
    color: "#333",
    textAlign: "center",
  },
});
