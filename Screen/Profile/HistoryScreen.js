import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useCallback } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { useMain } from "../../context/MainContext";
import HistoryGoalCard from "../../components/Goals/HistoryGoalCard";

export default function HistoryScreen({ navigation }) {
  const { historyGoals, loadHistoryGoals } = useMain();

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Load history goals every time the screen gains focus
  useFocusEffect(
    useCallback(() => {
      loadHistoryGoals();
    }, [])
  );

  // Render each history goal card in the FlatList
  const renderGoalCard = ({ item }) => (
    <HistoryGoalCard
      goalId={[item.id]}
      goal={item.goal}
      time={item.time}
      diamonds={item.diamonds}
    />
  );

  return (
    <View style={styles.container}>
      {/* Back button to navigate to the previous screen */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Icon name="arrow-back-outline" size={28} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>History Screen</Text>

      <View style={styles.cardsContainer}>
        {/* If there are history goals, display them in a FlatList; otherwise, show a message */}
        {historyGoals && historyGoals.length > 0 ? (
          <FlatList
            data={[...historyGoals].reverse()}
            keyExtractor={(item) => item.id || item.index.toString()}
            renderItem={renderGoalCard}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <Text style={styles.emptyText}>No history available</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7E4C6",
    paddingHorizontal: 20,
    paddingTop: Dimensions.get("window").height * 0.057,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.07,
    left: Dimensions.get("window").width * 0.07,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  cardsContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.05,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
