import React from "react";
import { useFonts } from 'expo-font';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

export default function StartScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../assets/fonts/MarkoOne-Regular.ttf")
  });

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.content]}>
        <Image
          source={require("../assets/images/StartScreenImage.png")}
          style={styles.image}
        />

        <Text style={[styles.title]}>Hello!</Text>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("StartPage")}
      >
        <Text style={styles.startText}>START</Text>
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
  image: {
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.5,
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 40,
    fontFamily: 'MarkoOne-Regular',
    marginTop: 10,
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 40,
    marginBottom: Dimensions.get("window").height * 0.25,
  },
  startText: {
    fontSize: 30,
    fontFamily: 'MarkoOne-Regular',
    color: "#333",
    textAlign: "center",
  },
});
