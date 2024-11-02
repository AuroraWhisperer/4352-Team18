import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import React, { useContext } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../context/AuthContext";

export default function SettingsScreen({ navigation }) {
  const { clearAsyncStorage, handleLogout, resetApp } = useAuth();

const handleLogOut = async () => {
  Alert.alert("Log Out", "Are you sure you want to log out?", [
    { text: "Cancel", style: "cancel" },
    {
      text: "OK",
      onPress: async () => {
        try {
          await handleLogout();
          navigation.navigate("StartPage");
        } catch (error) {
          console.error("Failed to log out:", error);
        }
      },
    },
  ]);
};

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleClearCache = () => {
    Alert.alert("Clear Cache", "Are you sure you want to clear the cache?", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: clearAsyncStorage, resetApp },
    ]);
  };

  const handleAboutPress = () => {
    navigation.navigate("AboutScreen");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Icon name="arrow-back-outline" size={28} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={handleClearCache}>
        <Text style={styles.buttonText}>Clear Cache</Text>
        <Icon name="chevron-forward-outline" size={24} color="#FFA726" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={handleAboutPress}>
        <Text style={styles.buttonText}>About PetConnect</Text>
        <Icon name="chevron-forward-outline" size={24} color="#FFA726" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={handleLogOut}>
        <Text style={styles.buttonText}>Log Out</Text>
        <Icon name="chevron-forward-outline" size={24} color="#FFA726" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7E4C6",
    paddingHorizontal: 20,
    paddingTop: Dimensions.get("window").height * 0.2,
  },
  backButton: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.1,
    left: Dimensions.get("window").width * 0.1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: "#FFA726",
    borderRadius: 8,
    backgroundColor: "transparent",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFA726",
    fontSize: 16,
    fontWeight: "bold",
  },
});
