import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import {
  saveDiaryContent,
  loadDiaryContent,
  saveImageUri,
  loadImageUri,
  saveHistoryDiaryContent,
  saveHistoryImageUri,
} from "../../context/diaryStorage";
import { useMain } from "../../context/MainContext";
import { useAuth } from "../../context/AuthContext"; // Import useAuth to get username
import ImagePickerComponent from "../../components/Camera/ImagePickerComponent";

export default function PostGoalsScreen({ navigation, route }) {
  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Return loading state if fonts are not loaded
  if (!fontsLoaded) {
    return undefined;
  }

  // Retrieve goal and diamond count from route params
  const { goal, cardDiamonds } = route.params;

  const { username } = useAuth();

  const [currentGoal, setCurrentGoal] = useState(goal);
  const [diamonds, setDiamonds] = useState(10);
  const [diaryContent, setDiaryContent] = useState("");
  const { totalDiamonds, addDiamondsToTotal } = useMain();
  const [isFirstSave, setIsFirstSave] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [wasPhotoInitiallyAdded, setWasPhotoInitiallyAdded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load diary content and image URI on component mount
  useEffect(() => {
    const fetchContent = async () => {
      if (!username || !goal) {
        console.error("Username or goal is missing");
        return;
      }
      console.log("Fetching content for:", username, goal);

      try {
        const content = await loadDiaryContent(username, goal);
        const uri = await loadImageUri(username, goal);

        if (content) {
          setDiaryContent(content);
          setIsFirstSave(false);
        } else {
          setIsFirstSave(true);
        }

        if (uri) {
          setImageUri(uri);
          setWasPhotoInitiallyAdded(true);
        }
      } catch (error) {
        console.error("Failed to fetch content:", error);
      }
    };

    fetchContent();
  }, [username, goal]);

  // Handle saving of diary content and image
  const handleSave = async () => {
    if (isSaving) return; // Prevent duplicate saves
    setIsSaving(true);

    if (!username || !goal) {
      Alert.alert("Error", "Cannot save. Missing username or goal.");
      setIsSaving(false);
      return;
    }

    try {
      // Save current diary content and image URI to storage
      console.log("Saving diary content for:", username, goal, diaryContent);
      await saveDiaryContent(username, goal, diaryContent);
      await saveHistoryDiaryContent(username, goal, diaryContent);

      console.log("Saving image URI for:", username, goal, imageUri);
      await saveImageUri(username, goal, imageUri);
      await saveHistoryImageUri(username, goal, imageUri);

      console.log("Data saved successfully");

      // Add diamonds only on the first save with non-empty content
      if (isFirstSave && diaryContent.trim() !== "") {
        addDiamondsToTotal(diamonds);
        setIsFirstSave(false);
      }

      // Add diamonds if a new photo was added
      if (imageUri && !wasPhotoInitiallyAdded) {
        addDiamondsToTotal(Number(cardDiamonds));
        setWasPhotoInitiallyAdded(true);
      }

      navigation.goBack();
    } catch (error) {
      console.error("Failed to save data:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    // Dismiss keyboard when tapping outside
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Header with back and save buttons */}
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

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Image picker for adding images */}
        <View style={[styles.imagePlaceholderContainer]}>
          <ImagePickerComponent imageUri={imageUri} setImageUri={setImageUri} />
        </View>

        {/* Display goal title */}
        <View style={styles.titleContainer}>
          <View style={styles.titleBackground}>
            <Text
              style={styles.titleText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {currentGoal}
            </Text>
          </View>
        </View>

        {/* Diary input area with diamonds display */}
        <View style={styles.diaryContainer}>
          <View style={styles.diaryHeader}>
            <Text style={styles.diaryText}>Diary</Text>

            {/* Display current diamond count */}
            <View
              style={[
                styles.currencyContainer,
                {
                  backgroundColor: "#FFC0CB",
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                },
              ]}
            >
              <Image
                source={require("../../assets/images/diamond.png")}
                style={{ width: 16, height: 16, marginBottom: -2 }}
              />
              <Text style={{ fontSize: 14, marginLeft: 10, fontWeight: "700" }}>
                {diamonds}
              </Text>
            </View>
          </View>

          {/* Text input for diary content */}
          <TextInput
            style={styles.diaryInput}
            placeholder="Write something..."
            multiline={true}
            value={diaryContent}
            onChangeText={setDiaryContent}
          />
        </View>

        {/* Background scenery image */}
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
  saveButton: {
    backgroundColor: "#FFF5EC",
    borderRadius: 20,
    height: 40,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: Dimensions.get("window").height * 0.08,
    right: Dimensions.get("window").width * 0.02,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: "MarkoOne-Regular",
    fontWeight: "bold",
    color: "#000",
  },
  imagePlaceholderContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.1,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
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
    fontFamily: "MarkoOne-Regular",
    fontWeight: "bold",
    color: "#333",
  },
  diaryContainer: {
    backgroundColor: "#FFF5EC",
    borderRadius: 10,
    padding: 15,
    width: Dimensions.get("window").width * 0.8,
    alignSelf: "center",
  },
  diaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  diaryText: {
    fontSize: 16,
    fontFamily: "MarkoOne-Regular",
    fontWeight: "bold",
    color: "#333",
  },
  diaryInput: {
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
  },
  currencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
