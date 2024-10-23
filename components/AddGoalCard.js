import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";

export default function AddGoalCard({
  onSubmit,
  setGoal,
  setTime,
  setDiamonds,
  goal,
  time,
  diamonds,
}) {
  const handleTimeChange = (text) => {
    if (/^\d*$/.test(text) && text.length <= 5) {
      setTime(text);
    } else if (text.length > 5) {
      Alert.alert("Invalid input", "Time cannot exceed 5 digits.");
    } else {
      Alert.alert("Invalid input", "Please enter only numbers for time.");
    }
  };

  const handleDiamondsChange = (text) => {
    if (/^\d*$/.test(text) && text.length <= 4) {
      setDiamonds(text);
    } else if (text.length > 4) {
      Alert.alert("Invalid input", "Diamonds cannot exceed 4 digits.");
    } else {
      Alert.alert("Invalid input", "Please enter only numbers for diamonds.");
    }
  };

  return (
    <View style={styles.card}>
      <TextInput
        style={styles.multilineInput}
        placeholder="Enter your goal"
        value={goal}
        onChangeText={(text) => setGoal(text)}
        placeholderTextColor="#888"
        multiline={true}
        numberOfLines={2}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter time (in hours)"
        value={time}
        keyboardType="numeric"
        onChangeText={handleTimeChange}
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter diamonds"
        value={diamonds}
        keyboardType="numeric"
        onChangeText={handleDiamondsChange}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "rgba(255, 233, 212, 0.8)",
    width: Dimensions.get("window").width * 0.8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  multilineInput: {
    backgroundColor: "#F5E8D0",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    color: "#333",
    fontSize: 16,
    textAlignVertical: "top",
    minHeight: 60,
  },
  input: {
    backgroundColor: "#F5E8D0",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    color: "#333",
    fontSize: 16,
  },

  submitButton: {
    backgroundColor: "#42A5F5",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
