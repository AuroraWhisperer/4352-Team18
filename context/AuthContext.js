import React, { createContext, useContext, useState, useEffect } from "react";
import { DevSettings } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [petname, setPetname] = useState("");

  const [goals, setGoals] = useState([]);
  const [historyGoals, setHistoryGoals] = useState([]);
  const [time, setTime] = useState(0);
  const [totalDiamonds, setTotalDiamonds] = useState(100);
  const [goal, setGoal] = useState([]);
  const [diamonds, setDiamonds] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [purchasedClothesItems, setPurchasedClothesItems] = useState([]);
  const [purchasedAccessoriesItems, setPurchasedAccessoriesItems] = useState(
    []
  );
  const [purchasedFoodItems, setPurchasedFoodItems] = useState([]);
  const [purchasedFurnitureItems, setPurchasedFurnitureItems] = useState([]);
  const [purchasedToysItems, setPurchasedToysItems] = useState([]);

  const [refreshKey, setRefreshKey] = useState(0);

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

        for (const account of adminAccounts) {
          await AsyncStorage.setItem(
            `user_${account.username}`,
            JSON.stringify(account)
          );
        }

        console.log("Admin accounts initialized with prefix");
      } catch (error) {
        console.error("Error initializing admin accounts", error);
      }
    };

    initAdminAccounts();
  }, []);

  const handleAdminLogin = async (username, password) => {
    try {
      const prefixedUsername = `user_${username}`;
      const adminData = await AsyncStorage.getItem(prefixedUsername);

      if (adminData) {
        const admin = JSON.parse(adminData);
        if (admin.username === username && admin.password === password) {
          setUsername(username);
          const userData = await AsyncStorage.getItem(`data_${username}`);
          if (userData) {
            const { petname } = JSON.parse(userData);
            setPetname(petname || "");
          }
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Error during admin login", error);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      setUsername("");
      setPetname("");

      await clearAsyncStorage();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const saveUserData = async (username, data) => {
    try {
      await AsyncStorage.setItem(`data_${username}`, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  const updatePetname = (newPetname) => {
    setPetname(newPetname);
    saveUserData(username, { petname: newPetname });
  };

  const handleUserLogin = (username, password) => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    return !!user;
  };

  const registerUser = async (newUser) => {
    try {
      const userKey = `user_${newUser.username}`;
      await AsyncStorage.setItem(userKey, JSON.stringify(newUser));
      setUsers((prevUsers) => [...prevUsers, newUser]);
      console.log("User registered successfully");
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  const clearAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const nonUserKeys = keys.filter((key) => !key.startsWith("user_"));
      await AsyncStorage.multiRemove(nonUserKeys);
      console.log("Non-user data cleared from AsyncStorage");
      DevSettings.reload();
    } catch (error) {
      console.error("Failed to clear non-user data:", error);
    }
  };

  // const clearAsyncStorage = async () => {
  //   try {
  //     const keys = await AsyncStorage.getAllKeys();
  //     console.log("All keys in AsyncStorage before clearing:", keys);

  //     const keysToKeep = [
  //       "user_tom",
  //       "user_hamzah",
  //       "user_katie",
  //       "user_mikayla",
  //     ];

  //     const keysToRemove = keys.filter((key) => !keysToKeep.includes(key));
  //     console.log("Keys to be removed:", keysToRemove);

  //     await AsyncStorage.multiRemove(keysToRemove);
  //     console.log("Selected data cleared from AsyncStorage");

  //     setGoals([]);
  //     setHistoryGoals([]);
  //     setTotalDiamonds(100);
  //     setTime(0);
  //     setGoal([]);
  //     setDiamonds(0);
  //     setTotalTime(0);
  //     setPurchasedClothesItems([]);
  //     setPurchasedAccessoriesItems([]);
  //     setPurchasedFoodItems([]);
  //     setPurchasedFurnitureItems([]);
  //     setPurchasedToysItems([]);

  //     const remainingKeys = await AsyncStorage.getAllKeys();
  //     console.log(
  //       "Remaining keys in AsyncStorage after clearing:",
  //       remainingKeys
  //     );

  //     // setRefreshKey((prevKey) => prevKey + 1);
  //     DevSettings.reload();
  //   } catch (error) {
  //     console.error("Failed to clear data:", error);
  //   }
  // };

  const resetApp = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "StartScreen" }],
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername,
        handleAdminLogin,
        handleUserLogin,
        registerUser,
        clearAsyncStorage,
        petname,
        setPetname,
        setPetname: updatePetname,
        handleLogout,
        resetApp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
