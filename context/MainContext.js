import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthContext.js";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const { username } = useAuth();
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState([]);
  const [time, setTime] = useState(0);
  const [diamonds, setDiamonds] = useState(0);

  const [totalDiamonds, setTotalDiamonds] = useState(100);
  const [totalTime, setTotalTime] = useState(0);

  const addGoal = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedGoals = await AsyncStorage.getItem(`goals_${username}`);
        if (storedGoals) {
          setGoals(JSON.parse(storedGoals));
        }

        const storedDiamonds = await AsyncStorage.getItem(
          `diamonds_${username}`
        );
        setTotalDiamonds(storedDiamonds ? JSON.parse(storedDiamonds) : 100);

        const storedTime = await AsyncStorage.getItem(`time_${username}`);
        setTotalTime(storedTime ? JSON.parse(storedTime) : 0);
      } catch (error) {
        console.error("Failed to load user data from AsyncStorage:", error);
      }
    };

    if (username) loadUserData();
  }, [username]);

  useEffect(() => {
    const saveUserData = async () => {
      try {
        if (username) {
          await AsyncStorage.setItem(
            `goals_${username}`,
            JSON.stringify(goals)
          );
          await AsyncStorage.setItem(
            `diamonds_${username}`,
            JSON.stringify(totalDiamonds)
          );
          await AsyncStorage.setItem(
            `time_${username}`,
            JSON.stringify(totalTime)
          );
        }
      } catch (error) {
        console.error("Failed to save user data to AsyncStorage:", error);
      }
    };
    saveUserData();
  }, [goals, totalDiamonds, totalTime, username]);

  const addDiamondsToTotal = (newDiamonds) => {
    const numericDiamonds = Number(newDiamonds);
    setTotalDiamonds((prevTotal) => prevTotal + numericDiamonds);
  };

  const addTimeToTotal = (newTime) => {
    setTotalTime((prevTotal) => prevTotal + newTime);
  };

  return (
    <MainContext.Provider
      value={{
        goals,
        addGoal,
        setGoals,
        goal,
        setGoal,
        diamonds,
        setDiamonds,
        time,
        setTime,
        totalDiamonds,
        addDiamondsToTotal,
        totalTime,
        addTimeToTotal,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => useContext(MainContext);
