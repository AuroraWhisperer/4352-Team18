import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import TotalDiamonds from "../../components/Display/TotalDiamonds";
import HoursDisplay from "../../components/Display/HoursDisplay";
import NewGoalCard from "../../components/Goals/NewGoalCard";
import ExistingGoalCard from "../../components/Goals/ExistingGoalCard";
import { useNavigation } from "@react-navigation/native";
import { useMain } from "../../context/MainContext";
import { useRoute } from "@react-navigation/native";
import { useTask } from "../../context/TaskContext";

export default function GoalsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { goals, setGoals, setHistoryGoals } = useMain();
  const { incrementTaskCount } = useTask();

  // Function to delete a goal
  const handleDeleteGoal = (id) => {
    setGoals((prevGoals) => {
      const updatedGoals = prevGoals.filter((goal) => goal.id !== id);
      // console.log("Filtered goal ID to delete:", id);
      // console.log("Updated goals list after deletion:", updatedGoals);
      return updatedGoals;
    });
  };

  useEffect(() => {
    if (route.params?.deleteGoalId) {
      const goalId = Array.isArray(route.params.deleteGoalId)
        ? route.params.deleteGoalId[0]
        : route.params.deleteGoalId;
      console.log("Attempting to delete goal with ID:", goalId);

      handleDeleteGoal(goalId);
      incrementTaskCount();
    }
  }, [route.params?.deleteGoalId]);

  return (
    <View style={[styles.container]}>
      <View style={[styles.contentWrapper]}>
        {/* Scrollable content area */}
        <View style={[styles.scrollViewWrapper]}>
          <ScrollView contentContainerStyle={[styles.scrollContent]}>
            <View style={[styles.header]}>
              <TotalDiamonds value={100} />
            </View>

            <View style={[styles.content]}>
              <HoursDisplay
                style={{ marginTop: 40, marginBottom: 30 }}
              />

              {/* Display each goal in reverse order */}
              {goals
                .slice()
                .reverse()
                .map((goal) => (
                  <ExistingGoalCard
                    key={[goal.id]}
                    goalId={[goal.id]}
                    goal={[goal.goal]}
                    time={[goal.time]}
                    diamonds={[goal.diamonds]}
                    onDelete={() => handleDeleteGoal(goal.id)}
                  />
                ))}

              {/* Button to add a new goal */}
              <NewGoalCard
                onPress={() => navigation.navigate("AddGoalsScreen")}
              />
            </View>
            <View style={[styles.extraSpace]}></View>
          </ScrollView>
        </View>

        {/* Fixed background image and bottom area */}
        <View style={[styles.fixedBottom]}>
          <Image
            source={require("../../assets/images/GoalScreenBottomImage.png")}
            style={[styles.sceneryImage]}
            resizeMode="stretch"
          />
          <View style={[styles.bottomArea]}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE9D4",
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "flex-start",
  },
  scrollViewWrapper: {
    height: Dimensions.get("window").height - 131,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 200,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingTop: Dimensions.get("window").height * 0.08,
    paddingRight: Dimensions.get("window").width * 0.05,
  },
  content: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.02,
  },
  extraSpace: {
    height: 100,
  },
  fixedBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: -1,
    bottom: -45,
  },
  sceneryImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 0.5,
    zIndex: -1,
  },
  bottomArea: {
    height: 130,
    backgroundColor: "#B76952",
    width: Dimensions.get("window").width * 1.5,
    bottom: 20,
    zIndex: -2,
  },
});
