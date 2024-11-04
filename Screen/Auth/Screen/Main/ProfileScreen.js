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
import { useAuth } from "../../context/AuthContext.js";

export default function ProfileScreen({ navigation }) {
  // Function to navigate to the settings screen
  const handleSettingsPress = () => {
    navigation.navigate("SettingsScreen");
  };

  // Function to navigate to the history screen
  const handleHistoryPress = () => {
    navigation.navigate("HistoryScreen");
  };

  // Destructure username from AuthContext to display the user's family name
  const { username } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      {/* Settings button in the top-right corner */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={handleSettingsPress}
      >
        <Icon name="settings-outline" size={34} color="#333" />
      </TouchableOpacity>

      {/* Main content area with title and image */}
      <View style={styles.content}>
        <Text style={styles.title}>PetConnect</Text>

        <Image
          source={require("../../assets/images/StartScreenImage.png")}
          style={styles.image}
        />
      </View>

      {/* Display user's family name */}
      <View style={[styles.TextWrapper]}>
        <Text style={[styles.text]}>{username} Family</Text>
      </View>

      {/* Card to view history, navigates to the HistoryScreen on press */}
      <TouchableOpacity style={styles.historyCard} onPress={handleHistoryPress}>
        <View style={styles.historyContent}>
          <Icon
            name="time-outline"
            size={24}
            color="#FFA726"
            style={styles.icon}
          />
          <Text style={styles.historyText}>View History</Text>
        </View>
        <Icon name="chevron-forward-outline" size={24} color="#FFA726" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7E4C6",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: Dimensions.get("window").height * 0.07,
  },
  settingsButton: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.06,
    right: Dimensions.get("window").width * 0.06,
    zIndex: 1,
    padding: 15,
    borderRadius: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: "MarkoOne-Regular",
    marginTop: Dimensions.get("window").height * 0.06,
    marginBottom: 5,
    textAlign: "center",
  },
  content: {
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").width * 0.4,
    marginTop: 5,
  },
  TextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.01,
  },
  text: {
    fontSize: 32,
    fontFamily: "MarkoOne-Regular",
    fontWeight: "bold",
    color: "#333",
  },
  historyCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FDF4E7",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFA726",
    top: Dimensions.get("window").height * 0.05,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  historyContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  historyText: {
    fontSize: 18,
    color: "#FFA726",
    fontWeight: "bold",
  },
});
