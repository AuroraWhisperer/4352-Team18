import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

export default function ExistingGoalCard({ goal, time, diamonds }) {
  return (
    <View style={[styles.card]}>
      <View style={[styles.leftSide]}>
        <Text style={[styles.goalText]} numberOfLines={3} ellipsizeMode="tail">
          {goal}
        </Text>
      </View>

      <View style={[styles.rightSide]}>
        <Text style={[styles.timeText]}>{time} hr</Text>
        <View style={[styles.diamondsContainer]}>
          <Image
            source={require("../assets/images/diamond.png")} 
            style={[styles.diamondImage]}
            resizeMode="contain"
          />
          <Text style={[styles.diamondsText]}>{diamonds}</Text>
        </View>
      </View>
    </View>
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
    fontFamily: 'MarkoOne-Regular',
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    width: Dimensions.get("window").width * 0.5,
    flexWrap: "wrap",
  },
  timeText: {
    fontFamily: 'MarkoOne-Regular',
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  diamondsContainer: {
    marginTop: Dimensions.get("window").height * 0.015,
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
    fontFamily: 'MarkoOne-Regular',
    fontSize: 16,
    color: "#333",
    marginLeft: 5,
  },
});
