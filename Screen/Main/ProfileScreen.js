import React from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useApp } from "../../context/AppContext.js";

export default function ProfileScreen({ navigation }) {
  const handleSettingsPress = () => {
    console.log("Settings button pressed");
    // navigation.navigate("SettingsScreen");
  };

  const { username } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={handleSettingsPress}
      >
        <Icon name="settings-outline" size={34} color="#333" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>PetConnect</Text>

        <Image
          source={require("../../assets/images/StartScreenImage.png")}
          style={styles.image}
        />
      </View>

      <View style={[styles.TextWrapper]}>
        <Text style={[styles.text]}>{username} Family</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7E4C6",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: Dimensions.get("window").height * 0.06,
  },
  settingsButton: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.04,
    right: Dimensions.get("window").width * 0.06,
    zIndex: 1,
    padding: 15,
    borderRadius: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: "MarkoOne-Regular",
    marginBottom: 20,
    textAlign: "center",
  },
  content: {
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").width * 0.4,
    marginTop: 10,
  },
  TextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.03,
  },
  text: {
    fontSize: 36,
    fontFamily: "MarkoOne-Regular",
    fontWeight: "bold",
    color: "#333",
  },
});
