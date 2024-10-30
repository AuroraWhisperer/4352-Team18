import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  Platform,
  ActionSheetIOS,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerComponent({ imageUri, setImageUri }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPermissions = async () => {
      const cameraStatus = await ImagePicker.getCameraPermissionsAsync();
      const mediaStatus = await ImagePicker.getMediaLibraryPermissionsAsync();
      setCameraPermission(cameraStatus.granted);
      setMediaLibraryPermission(mediaStatus.granted);
    };
    getPermissions();
  }, []);

  const chooseImageSource = () => {
    const options = ["Using the camera", "Select from photo gallery", "Cancel"];
    const cancelButtonIndex = 2;

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            openCamera();
          } else if (buttonIndex === 1) {
            openImageLibrary();
          }
        }
      );
    } else {
      Alert.alert(
        "Select image source",
        "",
        [
          { text: "Using the camera", onPress: openCamera },
          { text: "Select from photo gallery", onPress: openImageLibrary },
          { text: "Cancel", style: "cancel" },
        ],
        { cancelable: true }
      );
    }
  };

  const openCamera = async () => {
    if (cameraPermission === false) {
      Alert.alert("Requires camera privileges");
      return;
    }
    setLoading(true);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    setLoading(false);
    // console.log("Camera result:", result);
    if (
      result &&
      !result.canceled &&
      result.assets &&
      result.assets.length > 0
    ) {
      setImageUri(result.assets[0].uri);
      console.log("Image URI set to:", result.assets[0].uri);
    }
  };

  const openImageLibrary = async () => {
    if (mediaLibraryPermission === false) {
      Alert.alert("Requires access to the photo gallery");
      return;
    }
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    setLoading(false);
    // console.log("Library result:", result);
    if (
      result &&
      !result.canceled &&
      result.assets &&
      result.assets.length > 0
    ) {
      setImageUri(result.assets[0].uri);
      console.log("Image URI set to:", result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity onPress={chooseImageSource}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : require("../../assets/images/InsertImage.png")
          }
          style={{
            width: Dimensions.get("window").width * 0.37,
            height: Dimensions.get("window").width * 0.37,
            borderWidth: 2,
            borderColor: "#d3d3d3",
            borderRadius: 10,
          }}
        />
      )}
    </TouchableOpacity>
  );
}
