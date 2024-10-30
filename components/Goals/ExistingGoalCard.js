import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

let openSwipeableRef = null;

export default function ExistingGoalCard({ goal, time, diamonds, onDelete }) {
  const navigation = useNavigation();
  const swipeableRef = useRef(null);

  const deleteRelatedData = async (goal) => {
    const diaryKey = `diaryContent_${goal}`;
    const imageKey = `imageUri_${goal}`;
    try {
      await AsyncStorage.removeItem(diaryKey);
      await AsyncStorage.removeItem(imageKey);
      console.log("Related data deleted successfully.");
    } catch (error) {
      console.log("Failed to delete related data:", error);
    }
  };

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.5],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={handleDeleteConfirmation}>
        <Animated.View
          style={[styles.deleteButton, { transform: [{ scale }] }]}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const handleDeleteConfirmation = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this goal",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            swipeableRef.current?.close();
          },
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDelete(),
        },
      ]
    );
  };

  const handleDelete = async () => {
    await deleteRelatedData(goal);
    onDelete();

    swipeableRef.current?.close();
  };

  const handleSwipeOpen = () => {
    if (openSwipeableRef && openSwipeableRef !== swipeableRef.current) {
      openSwipeableRef.close();
    }
    openSwipeableRef = swipeableRef.current;
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      onSwipeableOpen={handleSwipeOpen}
    >
      <TouchableOpacity
        style={[styles.card]}
        onPress={() => navigation.navigate("PostGoalsScreen", { goal })}
      >
        <View style={[styles.leftSide]}>
          <Text
            style={[styles.goalText]}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {goal}
          </Text>
        </View>

        <View style={[styles.rightSide]}>
          <Text style={[styles.timeText]}>{time} hr</Text>
          <View style={[styles.diamondsContainer]}>
            <Image
              source={require("../../assets/images/diamond.png")}
              style={[styles.diamondImage]}
              resizeMode="contain"
            />
            <Text style={[styles.diamondsText]}>{diamonds}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.1,
    backgroundColor: "#FFF9F5",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 10,
  },
  leftSide: {
    flex: 3,
  },
  rightSide: {
    flex: 1,
    alignItems: "flex-end",
  },
  goalText: {
    fontFamily: "MarkoOne-Regular",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    width: Dimensions.get("window").width * 0.5,
    flexWrap: "wrap",
  },
  timeText: {
    fontFamily: "MarkoOne-Regular",
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  diamondsContainer: {
    marginTop: Dimensions.get("window").height * 0.005,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  diamondImage: {
    width: 18,
    height: 18,
  },
  diamondsText: {
    fontFamily: "MarkoOne-Regular",
    fontSize: 16,
    color: "#333",
    marginLeft: 5,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
    borderRadius: 15,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
