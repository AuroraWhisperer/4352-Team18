import React, { useState, useEffect } from "react";
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
} from "../../context/diaryStorage";
import { useFonts } from "expo-font";
import { useAuth } from "../../context/AuthContext";
import ImagePickerComponent from "../../components/Camera/ImagePickerComponent";

export default function EditablePostScreen({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  const { goal, goalId } = route.params;
  const { username } = useAuth();

  const [diaryContent, setDiaryContent] = useState("");
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await loadDiaryContent(username, goalId);
        const uri = await loadImageUri(username, goalId);

        if (content) {
          setDiaryContent(content);
        }

        if (uri) {
          setImageUri(uri);
        }
      } catch (error) {
        console.error("Failed to load diary content or image:", error);
      }
    };

    fetchContent();
  }, [username, goalId]);

  const handleSave = async () => {
    try {
      if (!imageUri) {
        Alert.alert("Photo Required", "Please add a photo before saving.");
        return;
      }

      await saveDiaryContent(username, goalId, diaryContent);
      await saveImageUri(username, goalId, imageUri);

      Alert.alert("Success", "Diary and photo saved successfully.");
      navigation.goBack();
    } catch (error) {
      console.error("Failed to save diary or image:", error);
    }
  };

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
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imagePlaceholderContainer}>
          <ImagePickerComponent imageUri={imageUri} setImageUri={setImageUri} />
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
          <TextInput
            style={styles.diaryInput}
            placeholder="Write something..."
            multiline={true}
            value={diaryContent}
            onChangeText={setDiaryContent}
          />
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
    color: "#000",
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
    color: "#333",
  },
  diaryInput: {
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    fontFamily: "MarkoOne-Regular",
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
