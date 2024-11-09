import React, { useState } from "react";
import { useFonts } from "expo-font";
import Checkbox from 'expo-checkbox';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Dimensions,
  } from "react-native";

export default function SignUpScreen4({ navigation }) {
  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Return loading state if fonts are not loaded
  if (!fontsLoaded) {
    return undefined;
  }

  const [middleChecked, setMiddleChecked] = useState(false);
  const [preChecked, setPreChecked] = useState(false);
  const [teensChecked, setTeensChecked] = useState(false);

  const nextDisabled = !middleChecked && !preChecked && !teensChecked;

  return (
    <SafeAreaView style={[styles.container]}>
        <TouchableOpacity
          style={[styles.backContent]}
          onPress={() => navigation.navigate("SignUpScreen3")}
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
        <Text style={[styles.inputText]}>What's your child's age group?</Text>
        <Text style={[styles.input2Text]}>(You can select multiple if you have more than one child)</Text>
      </View>

    <View style={styles.checkboxContainer}>
      <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={middleChecked} onValueChange={setMiddleChecked} />
        <Text style={styles.optionText}>Middle Childhood (6-8 years old)</Text>
      </View>

      <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={preChecked} onValueChange={setPreChecked} />
        <Text style={styles.optionText}>Pre-teens (9-12 years old)</Text>
      </View>

      <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={teensChecked} onValueChange={setTeensChecked} />
        <Text style={styles.optionText}>Teenagers (13-17 years old)</Text>
      </View>
    </View>


      <TouchableOpacity
        style={[styles.nextButton]}
        disabled = {nextDisabled}
        onPress={() => navigation.navigate("SignUpScreen5")}
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
    fontSize: 17,
    fontFamily: "MarkoOne-Regular",
    color: "#333",
    marginTop: 25,
    marginBottom: 5,
    width: "80%",
  },
  input2Text: {
    fontSize: 12,
    fontFamily: "MarkoOne-Regular",
    marginBottom: 120,
  },
  checkboxContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
    marginTop: 80,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
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
