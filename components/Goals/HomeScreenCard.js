import React from "react";
import { useFonts } from "expo-font";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreenCard({ goal, time, diamonds }) {
  const navigation = useNavigation();

  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Return loading state if fonts are not loaded
  if (!fontsLoaded) {
    return undefined;
  }

  // Touchable component that navigates to GoalsTab when pressed, passing goal, time, and diamonds as params
  return (
    <TouchableOpacity
      style={[styles.card]}
      onPress={() => navigation.navigate("GoalsTab", { goal, time, diamonds })}
    >
      {/* Left side of the card to display the goal text */}
      <View style={[styles.leftSide]}>
        <Text style={[styles.goalText]} numberOfLines={4} ellipsizeMode="tail">
          {goal}
        </Text>
      </View>

      {/* Right side of the card to display time and diamonds */}
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
    flex: 1.5,
    alignItems: "flex-end",
  },
  goalText: {
    fontFamily: "MarkoOne-Regular",
    fontSize: 18,
    color: "#333",
    width: Dimensions.get("window").width * 0.45,
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
});
