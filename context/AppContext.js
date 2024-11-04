// old code
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // global object Goals is an an array of goal, time and diamonds
  // global object goal is the new goal (Only one)
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState([]);
  const [time, setTime] = useState(0);
  const [diamonds, setDiamonds] = useState(0);

  const [totalDiamonds, setTotalDiamonds] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    const initAdminAccounts = async () => {
      try {
        await AsyncStorage.removeItem("user_katie");
        await AsyncStorage.removeItem("user_mikayla");
        await AsyncStorage.removeItem("user_tom");
        await AsyncStorage.removeItem("user_hamzah");

        const adminAccounts = [
          { username: "katie", password: "katie" },
          { username: "mikayla", password: "mikayla" },
          { username: "tom", password: "tom" },
          { username: "hamzah", password: "hamzah" },
        ];

        await AsyncStorage.setItem(
          "user_katie",
          JSON.stringify(adminAccounts[0])
        );
        await AsyncStorage.setItem(
          "user_mikayla",
          JSON.stringify(adminAccounts[1])
        );
        await AsyncStorage.setItem(
          "user_tom",
          JSON.stringify(adminAccounts[2])
        );
        await AsyncStorage.setItem(
          "user_hamzah",
          JSON.stringify(adminAccounts[3])
        );

        console.log("Admin accounts initialized with prefix");
      } catch (error) {
        console.error("Error initializing admin accounts", error);
      }
    };

    initAdminAccounts();
  }, []);

  const clearAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const nonUserKeys = keys.filter((key) => !key.startsWith("user_"));
      await AsyncStorage.multiRemove(nonUserKeys);
      console.log("Non-user data cleared from AsyncStorage");
    } catch (error) {
      console.error("Failed to clear non-user data:", error);
    }
  };

  const handleAdminLogin = async (username, password) => {
    try {
      const prefixedUsername = `user_${username}`;
      const adminData = await AsyncStorage.getItem(prefixedUsername);

      if (adminData) {
        const admin = JSON.parse(adminData);
        if (admin.username === username && admin.password === password) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Error during admin login", error);
      return false;
    }
  };

  const handleUserLogin = (username, password) => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    return !!user;
  };

  const registerUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <AppContext.Provider
      value={{
        goals,
        addGoal,
        goal,
        setGoal,
        username,
        setUsername,
        handleAdminLogin,
        handleUserLogin,
        registerUser,
        clearAsyncStorage,
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
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
