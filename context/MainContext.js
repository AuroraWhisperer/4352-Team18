import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState([]);
  const [time, setTime] = useState(0);
  const [diamonds, setDiamonds] = useState(0);

  const [totalDiamonds, setTotalDiamonds] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const addGoal = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
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

  const addDiamondsToTotal = (newDiamonds) => {
    setTotalDiamonds((prevTotal) => prevTotal + newDiamonds);
  };

  const addTimeToTotal = (newTime) => {
    setTotalTime((prevTotal) => prevTotal + newTime);
  };

  return (
    <MainContext.Provider
      value={{
        goals,
        addGoal,
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