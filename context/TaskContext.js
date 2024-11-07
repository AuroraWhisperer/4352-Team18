import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskCount, setTaskCount] = useState(0);
  const [level, setLevel] = useState(1);
  const { username, saveUserData } = useAuth();

  const calculateTasksToLevelUp = (level) => {
    if (level <= 5) return 3;
    if (level <= 10) return 4;
    if (level <= 15) return 5;
    return 6;
  };

  const tasksToLevelUp = calculateTasksToLevelUp(level);

  useEffect(() => {
    if (username) {
      const loadProgress = async () => {
        try {
          const storedTaskCount = await AsyncStorage.getItem(
            `tasks_${username}`
          );
          const storedLevel = await AsyncStorage.getItem(`level_${username}`);

          if (storedTaskCount !== null) {
            setTaskCount(parseInt(storedTaskCount));
          }
          if (storedLevel !== null) {
            setLevel(parseInt(storedLevel));
          }
        } catch (e) {
          console.error("Failed to load task count and level:", e);
        }
      };

      loadProgress();
    }
  }, [username]);

  const saveProgress = async (newLevel, newTaskCount) => {
    try {
      await AsyncStorage.setItem(`level_${username}`, newLevel.toString());
      await AsyncStorage.setItem(`tasks_${username}`, newTaskCount.toString());

      saveUserData(username, { level: newLevel, taskCount: newTaskCount });
    } catch (e) {
      console.error("Failed to save task count and level:", e);
    }
  };

  const incrementTaskCount = () => {
    if (taskCount + 1 >= tasksToLevelUp) {
      const newLevel = level + 1;
      setLevel(newLevel);
      setTaskCount(0);
      saveProgress(newLevel, 0);
    } else {
      const newTaskCount = taskCount + 1;
      setTaskCount(newTaskCount);
      saveProgress(level, newTaskCount);
    }
  };

  return (
    <TaskContext.Provider
      value={{ taskCount, level, tasksToLevelUp, incrementTaskCount }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
