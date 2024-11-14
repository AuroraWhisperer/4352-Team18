import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

export default function GuidanceScreen({ navigation }) {
  // Sample function for handling each guidance option click
  const handleOptionPress = (screen) => {
    navigation.navigate(screen);
  };

  // Function to handle back button
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Icon name="arrow-back-outline" size={28} color="#333" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Guidance Options</Text>

      {/* Guidance option cards */}
      <TouchableOpacity
        style={styles.optionCard}
        onPress={() => handleOptionPress("ProfileScreen")}
      >
        <Icon
          name="person-outline"
          size={28}
          color="#4A90E2"
          style={styles.icon}
        />
        <Text style={styles.optionText}>Profile Setup</Text>
        <Icon name="chevron-forward-outline" size={24} color="#4A90E2" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionCard}
        onPress={() => handleOptionPress("SettingsScreen")}
      >
        <Icon
          name="settings-outline"
          size={28}
          color="#F5A623"
          style={styles.icon}
        />
        <Text style={styles.optionText}>App Settings</Text>
        <Icon name="chevron-forward-outline" size={24} color="#F5A623" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionCard}
        onPress={() => handleOptionPress("HistoryScreen")}
      >
        <Icon
          name="time-outline"
          size={28}
          color="#50E3C2"
          style={styles.icon}
        />
        <Text style={styles.optionText}>Usage History</Text>
        <Icon name="chevron-forward-outline" size={24} color="#50E3C2" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionCard}
        onPress={() => handleOptionPress("HelpScreen")}
      >
        <Icon
          name="help-circle-outline"
          size={28}
          color="#B8E986"
          style={styles.icon}
        />
        <Text style={styles.optionText}>Help & Support</Text>
        <Icon name="chevron-forward-outline" size={24} color="#B8E986" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: Dimensions.get("window").height * 0.05,
    alignItems: "center",
    backgroundColor: "#FFE5D4",
  },
  backButton: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.04,
    left: Dimensions.get("window").width * 0.05,
    zIndex: 1,
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    marginTop: Dimensions.get("window").height * 0.08,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: "90%",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
});
