import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function AboutScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <Image
        source={require("../../assets/343c238af301b5c1f9152932ee7d3995.gif")}
        style={styles.catImage}
        resizeMode="contain"
      />

      <View style={styles.overlay}>

        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.goBackText}>Go Back</Text>
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

        <TouchableOpacity style={styles.button}>
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
    top: 40,
    left: 20,
    backgroundColor: "#FFF",
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
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  features: {
    marginVertical: 20,
  },
  featureItem: {
    fontSize: 16,
    color: "#444",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#FF8C00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 30,
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
});
