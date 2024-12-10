import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { Ionicons } from "@expo/vector-icons";

export default function AboutScreen() {
  const navigation = useNavigation();

  const handleOptionPress = (screen) => {
    navigation.navigate(screen);
  };

  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/cuteCat.gif")}
        style={styles.catImage}
        resizeMode="contain"
      />

      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-circle" size={48} color="#FF8C00" />
        </TouchableOpacity>

        <Text style={styles.title}>PetConnect</Text>

        <Text style={styles.description}>
          Welcome to PetConnect – the ultimate app for interacting with your
          virtual pet! Set personalized goals, accomplish fun tasks, and watch
          your pet grow alongside you. Embark on a rewarding journey, building
          unforgettable memories with your pet.
        </Text>

        <View style={styles.features}>
          <Text style={styles.featureItem}>
            • Earn rewards by completing tasks
          </Text>
          <Text style={styles.featureItem}>
            • Record and celebrate your pet’s milestones
          </Text>
          <Text style={styles.featureItem}>
            • Customize your journey with unique goals and adventures
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOptionPress("HelpScreen")}
        >
          <Text style={styles.buttonText}>Explore Features</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Version 1.0 | © 2024 PetConnect</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE6CC",
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 183, 77, 0.6)",
    width: "100%",
  },
  catImage: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    height: 200,
    opacity: 0.8,
    zIndex: 0,
  },
  goBackButton: {
    position: "absolute",
    top: 50,
    left: 15,
    // backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  goBackText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 32,
    fontFamily: "MarkoOne-Regular",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 15,
    fontFamily: "MarkoOne-Regular",
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  features: {
    marginVertical: 20,
  },
  featureItem: {
    fontFamily: "MarkoOne-Regular",
    fontSize: 15,
    color: "#444",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#FF8C00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 50,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "MarkoOne-Regular",
  },
  footer: {
    marginTop: 30,
    fontSize: 12,
    fontFamily: "MarkoOne-Regular",
    color: "#888",
    textAlign: "center",
  },
});
