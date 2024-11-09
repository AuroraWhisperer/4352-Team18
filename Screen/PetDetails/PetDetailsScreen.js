import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Star from "../../components/Display/Star";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { useTask } from "../../context/TaskContext";

export default function PetDetailsScreen() {
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  const [progress, setProgress] = useState(0);

  const navigation = useNavigation();
  const { petname, happiness, health, hunger } = useAuth();
  const { taskCount, level, tasksToLevelUp, incrementTaskCount } = useTask();

  const targetProgress = taskCount / tasksToLevelUp;

  const combinedRating = Math.round((happiness + health + hunger) / 3);

  useEffect(() => {
    const animateProgress = () => {
      setProgress((prev) => {
        if (prev < targetProgress) {
          return Math.min(prev + 0.01, targetProgress);
        } else {
          return targetProgress;
        }
      });
    };

    const interval = setInterval(animateProgress, 30);

    return () => clearInterval(interval);
  }, [taskCount, level, targetProgress]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity
        style={styles.backContent}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../../assets/images/backButton.png")}
          style={styles.backImage}
        />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/PetDetailsTopImage.png")}
          style={styles.petImage}
        />
      </View>

      <Text style={styles.title}>
        Welcome to {"\n"}
        {petname}'s house!
      </Text>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>Name: {petname}</Text>
        <Text style={styles.infoText}>Gender: Female</Text>
        <Text style={styles.infoText}>Age: 3</Text>
        <Text style={styles.infoText}>Level: {level}</Text>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.conditionTitle}>Progress to Next Level:</Text>

        <View style={styles.outerProgressContainer}>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBackground}>
              <View
                style={[styles.progressFill, { width: `${progress * 100}%` }]}
              />
            </View>
            <Text style={styles.progressText}>
              {taskCount}/{tasksToLevelUp}
            </Text>
          </View>
        </View>

        {/* <TouchableOpacity
          style={styles.manualTaskButton}
          onPress={incrementTaskCount}
        >
          <Text style={styles.manualTaskText}>Add Task (Manual)</Text>
        </TouchableOpacity> */}
      </View>

      <Text style={styles.conditionTitle}>RATING:</Text>
      <View style={styles.starContainer}>
        {Array(5)
          .fill()
          .map((_, index) => (
            <Star key={index} filled={index < combinedRating} />
          ))}
      </View>

      <Text style={styles.conditionTitle}>CONDITION:</Text>
      <View style={styles.conditionContainer}>
        <View style={styles.conditionItem} key="happy">
          <Text style={styles.conditionText}>HAPPY</Text>
          <View style={styles.starContainer}>
            {Array(5)
              .fill()
              .map((_, index) => (
                <Star key={`happy-star-${index}`} filled={index < happiness} />
              ))}
          </View>
        </View>

        <View style={styles.conditionItem} key="hungry">
          <Text style={styles.conditionText}>HUNGRY</Text>
          <View style={styles.starContainer}>
            {Array(5)
              .fill()
              .map((_, index) => (
                <Star key={`hungry-star-${index}`} filled={index < hunger} />
              ))}
          </View>
        </View>

        <View style={styles.conditionItem} key="healthy">
          <Text style={styles.conditionText}>HEALTHY</Text>
          <View style={styles.starContainer}>
            {Array(5)
              .fill()
              .map((_, index) => (
                <Star key={`healthy-star-${index}`} filled={index < health} />
              ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "#FFE9D4",
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  backContent: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.08,
    left: Dimensions.get("window").width * 0.08,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  imageContainer: {
    marginTop: Dimensions.get("window").height * 0.1,
    marginBottom: Dimensions.get("window").height * 0.03,
  },
  petImage: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").width * 0.4,
  },
  title: {
    fontSize: 26,
    fontFamily: "MarkoOne-Regular",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginVertical: 10,
    width: "90%",
  },
  infoText: {
    fontSize: 16,
    fontFamily: "MarkoOne-Regular",
    marginVertical: 5,
  },
  progressSection: {
    marginTop: 20,
    padding: 20,
    alignItems: "center",
    width: "90%",
    backgroundColor: "#FFE4B5",
    borderRadius: 10,
  },
  conditionTitle: {
    fontSize: 22,
    fontFamily: "MarkoOne-Regular",
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  outerProgressContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#000000",
    padding: 4,
    width: Dimensions.get("window").width * 0.7,
    height: 35,
    marginVertical: 10,
    justifyContent: "center",
  },
  progressBarContainer: {
    position: "relative",
    width: "100%",
    alignItems: "center",
  },
  progressBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFA07A",
    borderRadius: 15,
  },
  progressText: {
    position: "absolute",
    top: 2,
    left: "50%",
    transform: [{ translateX: -15 }],
    fontSize: 12,
    color: "#000000",
    fontWeight: "bold",
  },
  manualTaskButton: {
    backgroundColor: "#FF7F50",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  manualTaskText: {
    color: "white",
    fontWeight: "bold",
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  conditionContainer: {
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
  conditionItem: {
    alignItems: "center",
    marginVertical: 10,
  },
  conditionText: {
    marginTop: 5,
    fontSize: 18,
    fontFamily: "MarkoOne-Regular",
  },
});
