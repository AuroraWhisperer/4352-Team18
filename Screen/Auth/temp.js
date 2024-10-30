import React from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { useApp } from "../../context/AppContext";

export default function StartPage({ navigation }) {
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  const { clearAsyncStorage } = useApp(); // 从上下文中获取 clearAsyncStorage

  if (!fontsLoaded) {
    return null;
  }

  const handleClearStoragePress = () => {
    Alert.alert(
      "Clear Storage",
      "Sure you want to clear your local storage?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "verify", onPress: clearAsyncStorage }, // 调用从上下文中获取的 clearAsyncStorage
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <TouchableOpacity
        style={[styles.backContent]}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../../assets/images/backButton.png")}
          style={styles.backImage}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.clearButton}
        onPress={handleClearStoragePress}
      >
        <Text style={styles.clearButtonText}>Clear Local Storage</Text>
      </TouchableOpacity>

      <View style={[styles.content]}>
        <Image
          source={require("../../assets/images/StartScreenImage.png")}
          style={styles.image}
        />

        <Text style={[styles.title]}>PetConnect</Text>
      </View>

      <TouchableOpacity
        style={[styles.signButton]}
        onPress={() => navigation.navigate("SignInScreen1")}
      >
        <Text style={[styles.signText]}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.signButton]}>
        <Text style={[styles.signText]}>Sign Up For Family</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.familyCodeButton]}>
        <Text style={[styles.familyCodeText]}>Have a family code?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

