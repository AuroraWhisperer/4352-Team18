import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import { useMain } from "../../context/MainContext";
import TotalDiamonds from "../../components/Display/TotalDiamonds";
import HoursDisplay from "../../components/Display/HoursDisplay";
import AddGoalCard from "../../components/Goals/AddGoalCard";
import { Ionicons } from "@expo/vector-icons";

export default function AddGoalsScreen({ navigation }) {
  // Extract states and methods from MainContext
  const {
    addGoal,
    goals,
    goal,
    setGoal,
    time,
    setTime,
    diamonds,
    setDiamonds,
  } = useMain();

  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Return loading state if fonts are not loaded
  if (!fontsLoaded) {
    return undefined;
  }

  // Function to handle goal submission
  const handleSubmit = () => {
    console.log("goal:", goal, "time:", time, "diamonds:", diamonds);

    // Check if the goal already exists in the goals list
    const goalExists = goals.some((g) => g.goal === goal);

    // Validate inputs and display alerts if any field is missing or if the goal is a duplicate
    if (!goal) {
      Alert.alert("Error", "Please fill out the goal field.");
    } else if (!time) {
      Alert.alert("Error", "Please fill out the time field.");
    } else if (!diamonds) {
      Alert.alert("Error", "Please fill out the diamonds field.");
    } else if (goalExists) {
      Alert.alert(
        "Duplicate Goal",
        "This goal already exists. Please enter a unique goal."
      );
    } else {
      // If the goal is unique, add it and navigate back to the GoalsTab
      const newGoal = { goal, time, diamonds };
      addGoal(newGoal);
      navigation.navigate("HomeScreen", {
        screen: "GoalsTab",
        params: { newGoal },
      });

      console.log("Submitted data: ", newGoal);
    }
  };

  return (
    <View style={[styles.container]}>
      <ScrollView contentContainerStyle={[styles.scrollContent]}>
        {/* Header with back button and diamond count */}
        <View style={[styles.header]}>
          <TouchableOpacity
            style={[styles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={18}
              color="white"
              style={[styles.backIcon]}
            />
            <Text style={[styles.backButtonText]}>Back</Text>
          </TouchableOpacity>

          <TotalDiamonds value={100} />
        </View>

        {/* Main content area with HoursDisplay and AddGoalCard */}
        <View style={[styles.content]}>
          <HoursDisplay hours={0} />

          <View style={[styles.cardWrapper]}>
            <AddGoalCard
              style={[styles.card]}
              onSubmit={handleSubmit}
              setGoal={setGoal}
              setTime={setTime}
              setDiamonds={setDiamonds}
              goal={goal}
              time={time}
              diamonds={diamonds}
            />
          </View>
        </View>

        {/* Background scenery image at the bottom */}
        <View style={styles.scenery}>
          <Image
            source={require("../../assets/images/GoalScreenBottomImage.png")}
            style={[styles.sceneryImage]}
            resizeMode="stretch"
          />
        </View>

        <View style={[styles.bottomArea]}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE9D4",
    justifyContent: "space-between",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: Dimensions.get("window").height * 0.08,
    paddingRight: Dimensions.get("window").width * 0.07,
    paddingLeft: Dimensions.get("window").width * 0.06,
  },
  backButton: {
    flexDirection: "row",
    backgroundColor: "#D4A373",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    marginRight: 8,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "MarkoOne-Regular",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.05,
  },
  cardWrapper: {
    marginTop: 30,
  },
  card: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  scenery: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 20,
  },
  sceneryImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 0.5,
  },
  bottomArea: {
    height: 90,
    backgroundColor: "#B76952",
    width: Dimensions.get("window").width * 1.5,
    bottom: 0,
    zIndex: -1,
  },
});
