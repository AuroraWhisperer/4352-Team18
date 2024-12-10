import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import SafeAreaView from "react-native-safe-area-view";
import { Ionicons } from "@expo/vector-icons";

export default function HelpScreen() {
  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Return loading state if fonts are not loaded
  if (!fontsLoaded) {
    return undefined;
  }

  const [problems, setProblems] = useState([
    {
      id: "1",
      title: "How To Create A Family Goal",
      details:
        "Go to Goals page > Click a box 'add a goal for your family' > Enter your family's goal > Enter time for the goal > Click 'Submit' > Success!",
    },
    {
      id: "2",
      title: "How To Complete A Goal",
      details:
        "Go to Goals page > Click a goal box your family created > Post a photo using your camera or photo gallery (required!) > Write a diary to earn 10 more diamonds (optional) > Click 'Save' > Success!\n\nYou can earn rewards (diamonds) by completing a goal. Let's go shopping for your pet!",
    },
    {
      id: "3",
      title: "How To View Your Family's History",
      details: "Go to Profile page > Click 'View History Goals' > Success!",
    },
    {
      id: "4",
      title: "How To Buy An Item",
      details:
        "Go to Shop page > Choose an item you want to buy for your pet > Click an item > Confirm your purchase > Success!\n\nYour item is in your Pocket! (Go to Pocket page)",
    },
    {
      id: "5",
      title: "How To Apply An Item To Your Pet",
      details:
        "Go to Pocket page > Choose an item you want to give to your pet > Confirm > Success!\n\nUsing items, you can control your pet's condition!",
    },
    {
      id: "6",
      title: "How To View Your Pet's Details",
      details:
        "Go to Home page > Click menu (three lines) on top left or Click the cat image > Success!\n\nYou can see your pet's profile, rating, and conditions (Happy, Hungry, Healthy).\nYou can also check your level and progress to next level. Level up your pet! :)",
    },
  ]);

  const [expandedIds, setExpandedIds] = useState([]);

  const toggleExpand = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((item) => item !== id));
    } else {
      setExpandedIds((prev) => {
        const newExpandedIds = [...prev, id];
        if (newExpandedIds.length > 3) {
          newExpandedIds.shift();
        }
        return newExpandedIds;
      });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.problemItem}>
      <TouchableOpacity onPress={() => toggleExpand(item.id)}>
        <Text style={styles.title}>{item.title}</Text>

        {expandedIds.includes(item.id) && (
          <Text style={styles.details}>{item.details}</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={problems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7E4C6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "MarkoOne-Regular",
    marginLeft: 10,
    color: "#333",
  },
  listContainer: {
    padding: 20,
  },
  problemItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontFamily: "MarkoOne-Regular",
    color: "#333",
  },
  details: {
    marginTop: 10,
    fontSize: 13,
    fontFamily: "MarkoOne-Regular",
    color: "#666",
  },
});
