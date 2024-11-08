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

    console.log("Adding goal:", {
      // name: newGoal.goal,
      // id: goalWithId.id,
      goalWithId,
    });

    setGoals((prevGoals) => [...prevGoals, goalWithId]);
    setHistoryGoals((prevHistoryGoals) => [...prevHistoryGoals, goalWithId]);
  };

  // // Load goals from AsyncStorage on component mount
  // useEffect(() => {
  //   const loadGoals = async () => {
  //     try {
  //       const storedGoals = await AsyncStorage.getItem("goals");
  //       if (storedGoals) {
  //         setGoals(JSON.parse(storedGoals));
  //       }
  //     } catch (error) {
  //       console.error("Failed to load goals from AsyncStorage:", error);
  //     }
  //   };
  //   loadGoals();
  // }, []);

  // // Save goals to AsyncStorage whenever goals change
  // useEffect(() => {
  //   const saveGoals = async () => {
  //     try {
  //       await AsyncStorage.setItem("goals", JSON.stringify(goals));
  //     } catch (error) {
  //       console.error("Failed to save goals to AsyncStorage:", error);
  //     }
  //   };
  //   if (goals.length > 0) saveGoals();
  // }, [goals]);

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
          setTotalTime(storedTime ? JSON.parse(storedTime) : 0);
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
          await AsyncStorage.setItem(
            `time_${username}`,
            JSON.stringify(totalTime)
          );
        }
      } catch (error) {
        console.error("Failed to save user data to AsyncStorage:", error);
      }
    };

    if (username) saveUserData();
  }, [goals, historyGoals, totalDiamonds, totalTime, username]);

  // Function to add a new goal to history goals
  // Function to add a new goal to history goals with username
  const addToHistoryGoals = (newGoal) => {
    const goalWithId = {
      ...newGoal,
      id: uuid.v4(),
    };
    setHistoryGoals((prevHistoryGoals) => [...prevHistoryGoals, goalWithId]);
  };

  // Load user-specific history goals from AsyncStorage
  const loadHistoryGoals = async () => {
    try {
      if (username) {
        const storedHistoryGoals = await AsyncStorage.getItem(
          `historyGoals_${username}`
        );
        if (storedHistoryGoals) {
          setHistoryGoals(JSON.parse(storedHistoryGoals));
        }
      }
    } catch (error) {
      console.error("Failed to load history goals from AsyncStorage:", error);
    }
  };

  // Add diamonds to the total diamond count
  const addDiamondsToTotal = (newDiamonds) => {
    const numericDiamonds = Number(newDiamonds);
    setTotalDiamonds((prevTotal) => prevTotal + numericDiamonds);
  };

  // Reduce diamonds from the total diamond count
  const reduceDiamondsFromTotal = (price) => {
    setTotalDiamonds((prevTotal) => prevTotal - price);
  };

  // Add time to the total time
  const addTimeToTotal = (newTime) => {
    setTotalTime((prevTotal) => prevTotal + newTime);
  };

  return (
    // Provide values and functions to the MainContext for use across the app
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

// Custom hook for accessing MainContext
export const useMain = () => useContext(MainContext);
