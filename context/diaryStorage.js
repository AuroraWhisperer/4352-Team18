import AsyncStorage from "@react-native-async-storage/async-storage";

// Saving Diary Content for Goals
export const saveDiaryContent = async (username, goalId, content) => {
  try {
    const key = `diaryContent_${username}_${goalId}`;
    // console.log(`Saving diary content for key: ${key}, content: ${content}`);
    await AsyncStorage.setItem(key, content);
  } catch (error) {
    console.error("Failed to save diary content:", error);
  }
};

// Loading Diary Content for Goals
export const loadDiaryContent = async (username, goalId) => {
  try {
    const key = `diaryContent_${username}_${goalId}`;
    const content = await AsyncStorage.getItem(key);
    // console.log(`Loaded diary content for key: ${key}, content: ${content}`);
    return content;
  } catch (error) {
    console.error("Failed to load diary content:", error);
    return null;
  }
};

// Saving Image URI for Goals
export const saveImageUri = async (username, goalId, imageUri) => {
  const storageKey = `imageUri_${username}_${goalId}`;
  try {
    await AsyncStorage.setItem(storageKey, imageUri);
    console.log("Image URI saved!");
  } catch (error) {
    console.log("Failed to save image URI:", error);
  }
};

// Loading Image URI for Goals
export const loadImageUri = async (username, goalId) => {
  const storageKey = `imageUri_${username}_${goalId}`;
  try {
    const savedUri = await AsyncStorage.getItem(storageKey);
    return savedUri !== null ? savedUri : null;
  } catch (error) {
    console.log("Failed to load image URI:", error);
    return null;
  }
};

// New Functions for History Storage

// Saving Diary Content for History
export const saveHistoryDiaryContent = async (username, goalId, content) => {
  try {
    const storageKey = `historyDiaryContent_${username}_${goalId}`;
    console.log(
      `Saving diary content for key: ${storageKey}, content: ${content}`
    );
    await AsyncStorage.setItem(storageKey, content);
    console.log("History diary content saved!");
  } catch (error) {
    console.log("Failed to save history diary content:", error);
  }
};

// Loading Diary Content for History
export const loadHistoryDiaryContent = async (username, goalId) => {
  try {
    const storageKey = `historyDiaryContent_${username}_${goalId}`;
    const savedContent = await AsyncStorage.getItem(storageKey);
    console.log(
      `Loaded diary content for key: ${storageKey}, content: ${savedContent}`
    );
    return savedContent !== null ? savedContent : "";
  } catch (error) {
    console.log("Failed to load history diary content:", error);
    return "";
  }
};

// Saving Image URI for History
export const saveHistoryImageUri = async (username, goalId, imageUri) => {
  const storageKey = `historyImageUri_${username}_${goalId}`;
  try {
    await AsyncStorage.setItem(storageKey, imageUri);
    console.log("History image URI saved!");
  } catch (error) {
    console.log("Failed to save history image URI:", error);
  }
};

// Loading Image URI for History
export const loadHistoryImageUri = async (username, goalId) => {
  const storageKey = `historyImageUri_${username}_${goalId}`;
  try {
    const savedUri = await AsyncStorage.getItem(storageKey);
    return savedUri !== null ? savedUri : null;
  } catch (error) {
    console.log("Failed to load history image URI:", error);
    return null;
  }
};
