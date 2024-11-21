import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SafeAreaView from "react-native-safe-area-view";
import { Ionicons } from "@expo/vector-icons";

export default function HelpScreen() {
  const [problems, setProblems] = useState([
    {
      id: "1",
      title: "1",
      details: "1",
    },
    {
      id: "2",
      title: "2",
      details: "2",
    },
    {
      id: "3",
      title: "3",
      details: "3",
    },
    {
      id: "4",
      title: "4",
      details: "4",
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
      </TouchableOpacity>

      {expandedIds.includes(item.id) && (
        <Text style={styles.details}>{item.details}</Text>
      )}
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
    fontWeight: "bold",
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
    fontWeight: "bold",
    color: "#333",
  },
  details: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
});
