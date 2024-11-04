import React, { useEffect } from "react";
import { useMain } from "../../context/MainContext";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
} from "react-native";

export default function AddGoalCard({ onSubmit }) {
  const { goal, setGoal, time, setTime, diamonds, setDiamonds } = useMain();

  // Initialize the form fields when the component mounts
  useEffect(() => {
    setGoal("");
    setTime("");
    setDiamonds("");
  }, []);

  // Handle time input change and calculate diamonds based on time
  const handleTimeChange = (text) => {
    if (/^\d{0,4}(\.\d{0,2})?$/.test(text)) {
      setTime(text);
      const timeValue = parseFloat(text);
      if (!isNaN(timeValue)) {
        setDiamonds(Math.floor(timeValue * 40));
      } else {
        setDiamonds("");
      }
    } else {
      Alert.alert(
        "Invalid input",
        "Please enter a valid number with up to 4 digits and 2 decimal places."
      );
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    onSubmit();
    setGoal("");
    setTime("");
    setDiamonds("");
  };

  return (
    <View style={[styles.card]}>
      {/* Input field for entering the goal description */}
      <TextInput
        style={[styles.multilineInput]}
        placeholder="Enter your goal"
        value={goal}
        onChangeText={(text) => setGoal(text)}
        placeholderTextColor="#888"
        multiline={true}
        numberOfLines={2}
      />

      {/* Input field for entering time in hours */}
      <TextInput
        style={[styles.input]}
        placeholder="Enter time (in hours)"
        value={time}
        keyboardType="numeric"
        onChangeText={handleTimeChange}
        placeholderTextColor="#888"
      />

      {/* Display calculated diamonds based on entered time */}
      <View style={styles.diamondsContainer}>
        <Image
          source={require("../../assets/images/diamond.png")}
          style={styles.diamondIcon}
        />
        <Text style={[styles.diamondsText]}>Diamonds: {diamonds}</Text>
      </View>

      {/* Submit button to add the goal */}
      <TouchableOpacity style={[styles.submitButton]} onPress={handleSubmit}>
        <Text style={[styles.submitButtonText]}>Submit</Text>
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
    fontFamily: "MarkoOne-Regular",
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
    fontFamily: "MarkoOne-Regular",
    fontSize: 16,
  },
  diamondsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  diamondIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  diamondsText: {
    fontSize: 18,
    color: "#333",
    fontFamily: "MarkoOne-Regular",
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
    fontFamily: "MarkoOne-Regular",
  },
});
