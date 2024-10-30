import React from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

export default function ClothesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to {"\n"}Luna's pocket!</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/StartScreenImage.png")}
            style={styles.catImage}
          />
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.tabsContainer}>
          <Text style={styles.tab}>Clothes</Text>
          <Text style={styles.tab}>Accessories</Text>
          <Text style={styles.tab}>Food</Text>
          <Text style={styles.tab}>Toys</Text>
          <Text style={styles.tab}>Furniture</Text>
        </View>

        <View style={styles.centerContent}>
          <Text style={styles.callToAction}>
            MEOW... BUY SOME CLOTHES FOR ME!
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Go shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7E4C6",
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  catImage: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    resizeMode: "contain",
  },
  bottomSection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  tab: {
    fontSize: 20,
    color: "#888",
  },
  tabActive: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    borderBottomWidth: 2,
    borderBottomColor: "#333",
    paddingBottom: 5,
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginTop: Dimensions.get("window").height * 0.15,
    marginBottom: Dimensions.get("window").height * 0.15,
  },
  callToAction: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
