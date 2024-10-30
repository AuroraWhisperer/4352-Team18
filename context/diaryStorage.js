import AsyncStorage from "@react-native-async-storage/async-storage";

// Saving Dairy Content
export const saveDiaryContent = async (goal, content) => {
  const storageKey = `diaryContent_${goal}`;
  try {
    await AsyncStorage.setItem(storageKey, content);
    console.log("Diary content saved!");
  } catch (error) {
    console.log("Failed to save diary content:", error);
  }
};

// Loading Dairy Content
export const loadDiaryContent = async (goal) => {
  const storageKey = `diaryContent_${goal}`;
  try {
    const savedContent = await AsyncStorage.getItem(storageKey);
    return savedContent !== null ? savedContent : "";
  } catch (error) {
    console.log("Failed to load diary content:", error);
    return "";
  }
};

// Saving Picture URI
export const saveImageUri = async (goal, imageUri) => {
  const storageKey = `imageUri_${goal}`;
  try {
    await AsyncStorage.setItem(storageKey, imageUri);
    console.log("Image URI saved!");
  } catch (error) {
    console.log("Failed to save image URI:", error);
  }
};

// Loading Picture URI
export const loadImageUri = async (goal) => {
  const storageKey = `imageUri_${goal}`;
  try {
    const savedUri = await AsyncStorage.getItem(storageKey);
    return savedUri !== null ? savedUri : null;
  } catch (error) {
    console.log("Failed to load image URI:", error);
    return null;
  }
};
