import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthContext.js";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const { username } = useAuth();

  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState([]);
  const [historyGoals, setHistoryGoals] = useState([]);

  const [time, setTime] = useState(0);
  const [diamonds, setDiamonds] = useState(0);

  const [totalDiamonds, setTotalDiamonds] = useState(100);
  const [totalTime, setTotalTime] = useState(0);

  const addGoal = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
    setHistoryGoals((prevHistoryGoals) => [...prevHistoryGoals, newGoal]);
  };

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const storedGoals = await AsyncStorage.getItem("goals");
        if (storedGoals) {
          setGoals(JSON.parse(storedGoals));
        }
      } catch (error) {
        console.error("Failed to load goals from AsyncStorage:", error);
      }
    };
    loadGoals();
  }, []);

  useEffect(() => {
    const saveGoals = async () => {
      try {
        await AsyncStorage.setItem("goals", JSON.stringify(goals));
      } catch (error) {
        console.error("Failed to save goals to AsyncStorage:", error);
      }
    };
    if (goals.length > 0) saveGoals();
  }, [goals]);

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
          setTotalTime(storedTime ? JSON.parse(storedTime) : 0);
        }
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
            `historyGoals_${username}`,
            JSON.stringify(historyGoals)
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
  }, [goals, historyGoals, totalDiamonds, totalTime, username]);

  const addToHistoryGoals = (newGoal) => {
    setHistoryGoals((prevHistoryGoals) => [...prevHistoryGoals, newGoal]);
  };

  const loadHistoryGoals = async () => {
    try {
      const storedHistoryGoals = await AsyncStorage.getItem(
        `historyGoals_${username}`
      );
      if (storedHistoryGoals) {
        setHistoryGoals(JSON.parse(storedHistoryGoals));
      }
    } catch (error) {
      console.error("Failed to load history goals from AsyncStorage:", error);
    }
  };

  const addDiamondsToTotal = (newDiamonds) => {
    const numericDiamonds = Number(newDiamonds);
    setTotalDiamonds((prevTotal) => prevTotal + numericDiamonds);
  };

  const reduceDiamondsFromTotal = (price) => {
    setTotalDiamonds((prevTotal) => prevTotal - price);
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
        historyGoals,
        setHistoryGoals,
        addToHistoryGoals,
        loadHistoryGoals,
        diamonds,
        setDiamonds,
        time,
        setTime,
        totalDiamonds,
        addDiamondsToTotal,
        reduceDiamondsFromTotal,
        totalTime,
        addTimeToTotal,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => useContext(MainContext);
