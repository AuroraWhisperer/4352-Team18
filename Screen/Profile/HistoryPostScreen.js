import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import {
  loadHistoryDiaryContent,
  loadHistoryImageUri,
} from "../../context/diaryStorage";
import { useFocusEffect } from "@react-navigation/native";

export default function PostGoalsScreen({ navigation, route }) {
  const { goal } = route.params;
  const [historyDiaryContent, setHistoryDiaryContent] = useState("");
  const [historyImageUri, setHistoryImageUri] = useState(null);

  const fetchContent = async () => {
    try {
      const content = await loadHistoryDiaryContent(goal);
      const uri = await loadHistoryImageUri(goal);

      if (content) {
        setHistoryDiaryContent(content);
      }

      if (uri) {
        setHistoryImageUri(uri);
      }
    } catch (error) {
      console.error("Failed to load history data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchContent();
    }, [goal])
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.topNavigation}>
          <TouchableOpacity
            style={styles.backContent}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../../assets/images/backButton.png")}
              style={styles.backImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.imagePlaceholderContainer}>
          {historyImageUri ? (
            <Image
              source={{ uri: historyImageUri }}
              style={styles.imagePlaceholder}
            />
          ) : (
            <View style={styles.placeholderBox}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}
        </View>

        <View style={styles.titleContainer}>
          <View style={styles.titleBackground}>
            <Text
              style={styles.titleText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {goal}
            </Text>
          </View>
        </View>

        <View style={styles.diaryContainer}>
          <View style={styles.diaryHeader}>
            <Text style={styles.diaryText}>Diary</Text>
          </View>
          <Text style={styles.diaryContent}>
            {historyDiaryContent || "No diary content available."}
          </Text>
        </View>

        <View style={styles.scenery}>
          <Image
            source={require("../../assets/images/GoalScreenBottomImage.png")}
            style={styles.sceneryImage}
            resizeMode="stretch"
          />
        </View>

        <View style={styles.bottomArea}></View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE9D4",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  topNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Dimensions.get("window").height * 0.05,
  },
  backContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "absolute",
    top: Dimensions.get("window").height * 0.08,
    left: Dimensions.get("window").width * 0.05,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  imagePlaceholderContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.1,
  },
  imagePlaceholder: {
    width: Dimensions.get("window").width * 0.37,
    height: Dimensions.get("window").width * 0.37,
    borderWidth: 2,
    borderColor: "#d3d3d3",
    borderRadius: 10,
  },
  placeholderBox: {
    width: Dimensions.get("window").width * 0.37,
    height: Dimensions.get("window").width * 0.37,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#d3d3d3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: "#888",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.03,
    marginBottom: Dimensions.get("window").height * 0.02,
  },
  titleBackground: {
    backgroundColor: "#FFF5EC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: Dimensions.get("window").width * 0.8,
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  diaryContainer: {
    backgroundColor: "#FFF5EC",
    borderRadius: 10,
    padding: 15,
    width: Dimensions.get("window").width * 0.8,
    alignSelf: "center",
    // marginTop: Dimensions.get
  },
  diaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  diaryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  diaryContent: {
    fontSize: 14,
    color: "#555",
    textAlign: "left",
  },
  scenery: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: Dimensions.get("window").height * 0.1,
  },
  sceneryImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 0.5,
  },
  bottomArea: {
    height: 200,
    backgroundColor: "#B76952",
    width: Dimensions.get("window").width * 2,
    marginLeft: -Dimensions.get("window").width * 0.4,
    marginTop: -Dimensions.get("window").height * 0.04,
    bottom: 0,
    zIndex: -1,
  },
});
