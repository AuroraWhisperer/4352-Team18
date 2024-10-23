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

export default function StartPage({ navigation }) {
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../assets/fonts/MarkoOne-Regular.ttf")
  });

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <TouchableOpacity 
        Style ={[styles.backContent]}
        onPress={() => navigation.navigate("StartScreen")}
      >
        <Image source={require("../assets/images/backButton.png")}
        style={styles.backImage}
        />
      </TouchableOpacity>

      <View style={[styles.content]}>
        <Image
          source={require("../assets/images/StartScreenImage.png")}
          style={styles.image}
        />

        <Text style={[styles.title]}>PetConnect</Text>
      </View>

      <TouchableOpacity
        style={styles.signButton}
        onPress={() => navigation.navigate("SignInScreen1")}
      >
        <Text style={styles.signText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signButton}
        //onPress={() => navigation.navigate("StartPage")}
      >
        <Text style={styles.signText}>Sign Up For Family</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.familyCodeButton}
        //onPress={() => navigation.navigate("StartPage")}
      >
        <Text style={styles.familyCodeText}>Have a family code?</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
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
        width: Dimensions.get("window").width * 0.5,
        height: Dimensions.get("window").width * 0.5,
        marginTop: 40,
        marginBottom: 10,
    },
    title: {
        fontSize: 40,
        fontFamily: 'MarkoOne-Regular',
        marginTop: 10,
        marginBottom: 50,
    },
    signButton: {
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingVertical: 13,
        paddingHorizontal: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 20,
    },
    signText: {
        fontSize: 25,
        fontFamily: 'MarkoOne-Regular',
        color: "#333",
        textAlign: "center",
    },
    familyCodeButton: {
        marginBottom: Dimensions.get("window").height * 0.18,
    },
    familyCodeText: {
        textDecorationLine: 'underline',
        fontFamily: 'MarkoOne-Regular',
    }
  });
  