import AsyncStorage from "@react-native-async-storage/async-storage";

// Saving Diary Content for Goals
export const saveDiaryContent = async (goal, content) => {
  const storageKey = `diaryContent_${goal}`;
  try {
    await AsyncStorage.setItem(storageKey, content);
    console.log("Diary content saved!");
  } catch (error) {
    console.log("Failed to save diary content:", error);
  }
};

// Loading Diary Content for Goals
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

// Saving Image URI for Goals
export const saveImageUri = async (goal, imageUri) => {
  const storageKey = `imageUri_${goal}`;
  try {
    await AsyncStorage.setItem(storageKey, imageUri);
    console.log("Image URI saved!");
  } catch (error) {
    console.log("Failed to save image URI:", error);
  }
};

// Loading Image URI for Goals
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

// ================================
// New Functions for History Storage
// ================================

// Saving Diary Content for History
export const saveHistoryDiaryContent = async (goal, content) => {
  const storageKey = `historyDiaryContent_${goal}`;
  try {
    await AsyncStorage.setItem(storageKey, content);
    console.log("History diary content saved!");
  } catch (error) {
    console.log("Failed to save history diary content:", error);
  }
};

// Loading Diary Content for History
export const loadHistoryDiaryContent = async (goal) => {
  const storageKey = `historyDiaryContent_${goal}`;
  try {
    const savedContent = await AsyncStorage.getItem(storageKey);
    return savedContent !== null ? savedContent : "";
  } catch (error) {
    console.log("Failed to load history diary content:", error);
    return "";
  }
};

// Saving Image URI for History
export const saveHistoryImageUri = async (goal, imageUri) => {
  const storageKey = `historyImageUri_${goal}`;
  try {
    await AsyncStorage.setItem(storageKey, imageUri);
    console.log("History image URI saved!");
  } catch (error) {
    console.log("Failed to save history image URI:", error);
  }
};

// Loading Image URI for History
export const loadHistoryImageUri = async (goal) => {
  const storageKey = `historyImageUri_${goal}`;
  try {
    const savedUri = await AsyncStorage.getItem(storageKey);
    return savedUri !== null ? savedUri : null;
  } catch (error) {
    console.log("Failed to load history image URI:", error);
    return null;
  }
};
