import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthContext.js";
import uuid from "react-native-uuid";

export const MainContext = createContext();

// MainProvider component to provide the main context to the app
export const MainProvider = ({ children }) => {
  const { username } = useAuth();

  // State variables to manage goals, time, and diamond count
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState([]);
  const [historyGoals, setHistoryGoals] = useState([]);

  const [time, setTime] = useState(0);
  const [diamonds, setDiamonds] = useState(0);

  const [totalDiamonds, setTotalDiamonds] = useState(100);
  const [totalTime, setTotalTime] = useState(0);

  // Function to add a new goal to current and history goals
  const addGoal = (newGoal) => {
    const goalWithId = {
      ...newGoal,
      id: uuid.v4(),
    };

    setGoals((prevGoals) => [...prevGoals, goalWithId]);
    setHistoryGoals((prevHistoryGoals) => [...prevHistoryGoals, goalWithId]);
  };

  const addTotalTime = () => {
    setTotalTime((prevTotalTime) => prevTotalTime + time);
    setTime(0); // Reset time after adding to totalTime
  };

  // Load user-specific data (goals, diamonds, time) from AsyncStorage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        if (username) {
          const storedGoals = await AsyncStorage.getItem(`goals_${username}`);
          if (storedGoals) {
            setGoals(JSON.parse(storedGoals));
          }

          const storedHistoryGoals = await AsyncStorage.getItem(
            `historyGoals_${username}`
          );
          if (storedHistoryGoals) {
            setHistoryGoals(JSON.parse(storedHistoryGoals));
          }

          const storedDiamonds = await AsyncStorage.getItem(
            `diamonds_${username}`
          );
          setTotalDiamonds(storedDiamonds ? JSON.parse(storedDiamonds) : 100);

          const storedTime = await AsyncStorage.getItem(`time_${username}`);
          setTime(storedTime ? JSON.parse(storedTime) : 0);

          const storedTotalTime = await AsyncStorage.getItem(
            `totalTime_${username}`
          );
          setTotalTime(storedTotalTime ? JSON.parse(storedTotalTime) : 0);
        }
      } catch (error) {
        console.error("Failed to load user data from AsyncStorage:", error);
      }
    };

    if (username) loadUserData();
  }, [username]);

  // Save user-specific data to AsyncStorage whenever it changes
  useEffect(() => {
    const saveUserData = async () => {
      try {
        if (username) {
          await AsyncStorage.setItem(
            `goals_${username}`,
            JSON.stringify(goals)
          );
          await AsyncStorage.setItem(
            `historyGoals_${username}`,
            JSON.stringify(historyGoals)
          );
          await AsyncStorage.setItem(
            `diamonds_${username}`,
            JSON.stringify(totalDiamonds)
          );
          await AsyncStorage.setItem(`time_${username}`, JSON.stringify(time));
          await AsyncStorage.setItem(
            `totalTime_${username}`,
            JSON.stringify(totalTime)
          );
        }
      } catch (error) {
        console.error("Failed to save user data to AsyncStorage:", error);
      }
    };

    if (username) saveUserData();
  }, [goals, historyGoals, totalDiamonds, time, totalTime, username]);

  // Function to add diamonds to the total diamond count
  const addDiamondsToTotal = (newDiamonds) => {
    const numericDiamonds = Number(newDiamonds);
    setTotalDiamonds((prevTotal) => prevTotal + numericDiamonds);
  };

  // Reduce diamonds from the total diamond count
  const reduceDiamondsFromTotal = (price) => {
    setTotalDiamonds((prevTotal) => prevTotal - price);
  };

  return (
    <MainContext.Provider
      value={{
        goals,
        addGoal,
        setGoals,
        addTotalTime,
        goal,
        setGoal,
        historyGoals,
        setHistoryGoals,
        diamonds,
        setDiamonds,
        time,
        setTime,
        totalDiamonds,
        addDiamondsToTotal,
        reduceDiamondsFromTotal,
        totalTime,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

// Custom hook for accessing MainContext
export const useMain = () => useContext(MainContext);
