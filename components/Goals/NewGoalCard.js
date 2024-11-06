import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useAuth } from "../../context/AuthContext";

export default function NewGoalCard({ onPress }) {
  const { username, familyname, isAdmin } = useAuth();

  return (
    // Touchable card that triggers the onPress function when pressed
    <TouchableOpacity style={[styles.card]} onPress={onPress}>
      <View style={[styles.iconTextWrapper]}>
        <Icon name="plus-circle" size={24} color="#333" style={styles.icon} />
        <Text style={[styles.text]}>
          Add a goal for {isAdmin ? username : familyname} Family
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.1,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
    zIndex: 2,
  },
  iconTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: "MarkoOne-Regular",
    fontWeight: "bold",
    color: "#333",
  },
});
