import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TotalDiamonds from "../../components/Display/TotalDiamonds";

const PocketHeader = () => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <MaterialIcons
          name="shopping-cart"
          size={24}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.title}>Let's go shopping for Luna!</Text>
      </View>

      <Image
        source={require("../../assets/images/StartScreenImage.png")}
        style={styles.image}
      />

      <TotalDiamonds style={[styles.diamonds]} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    // padding: 16,
    backgroundColor: "#F7E4C6",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    paddingTop: Dimensions.get("window").height * 0.03,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: Dimensions.get("window").width * 0.45,
    height: Dimensions.get("window").width * 0.45,
    borderRadius: 75,
  },
  diamonds: {
    marginTop: 20,
    marginBottom: Dimensions.get("window").height * 0.01,
  },
});

export default PocketHeader;
