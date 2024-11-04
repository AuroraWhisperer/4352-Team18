import React, { createContext, useContext, useState, useEffect } from "react";
import { DevSettings } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";

export const AuthContext = createContext();

// AuthProvider component to provide authentication context to the app
export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();

  // State variables to manage user information and application data
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [petname, setPetname] = useState("");

  // Initialize admin accounts in AsyncStorage
  useEffect(() => {
    const initAdminAccounts = async () => {
      try {
        // Remove existing admin accounts
        await AsyncStorage.removeItem("admin_katie");
        await AsyncStorage.removeItem("admin_mikayla");
        await AsyncStorage.removeItem("admin_tom");
        await AsyncStorage.removeItem("admin_hamzah");

        // Define new admin accounts
        const adminAccounts = [
          { username: "katie", password: "katie" },
          { username: "mikayla", password: "mikayla" },
          { username: "tom", password: "tom" },
          { username: "hamzah", password: "hamzah" },
        ];

        // Store each admin account in AsyncStorage
        for (const account of adminAccounts) {
          await AsyncStorage.setItem(
            `admin_${account.username}`,
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

  // Handle admin login by validating against stored data
  const handleAdminLogin = async (username, password) => {
    try {
      const prefixedUsername = `admin_${username}`;
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

  // Handle user logout, clearing session data
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

  // Save user-specific data to AsyncStorage
  const saveUserData = async (username, data) => {
    try {
      await AsyncStorage.setItem(`data_${username}`, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  // Update pet name in state and save it in AsyncStorage
  const updatePetname = (newPetname) => {
    setPetname(newPetname);
    saveUserData(username, { petname: newPetname });
  };

  // Handle regular user login by checking against in-memory user list
  const handleUserLogin = (username, password) => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    return !!user;
  };

  // Register a new user and store them in AsyncStorage
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

  // Clear all non-user-specific data from AsyncStorage
  const clearAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const nonUserKeys = keys.filter((key) => !key.startsWith("admin_"));
      await AsyncStorage.multiRemove(nonUserKeys);
      console.log("Non-user data cleared from AsyncStorage");
      DevSettings.reload();
    } catch (error) {
      console.error("Failed to clear non-user data:", error);
    }
  };

  /* // old version of clear program
  const clearAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log("All keys in AsyncStorage before clearing:", keys);

      const keysToKeep = [
        "user_tom",
        "user_hamzah",
        "user_katie",
        "user_mikayla",
      ];

      const keysToRemove = keys.filter((key) => !keysToKeep.includes(key));
      console.log("Keys to be removed:", keysToRemove);

      await AsyncStorage.multiRemove(keysToRemove);
      console.log("Selected data cleared from AsyncStorage");

      setGoals([]);
      setHistoryGoals([]);
      setTotalDiamonds(100);
      setTime(0);
      setGoal([]);
      setDiamonds(0);
      setTotalTime(0);
      setPurchasedClothesItems([]);
      setPurchasedAccessoriesItems([]);
      setPurchasedFoodItems([]);
      setPurchasedFurnitureItems([]);
      setPurchasedToysItems([]);

      const remainingKeys = await AsyncStorage.getAllKeys();
      console.log(
        "Remaining keys in AsyncStorage after clearing:",
        remainingKeys
      );

      // setRefreshKey((prevKey) => prevKey + 1);
      DevSettings.reload();
    } catch (error) {
      console.error("Failed to clear data:", error);
    }
  }; */

  // Reset app navigation to the StartScreen
  const resetApp = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "StartScreen" }],
      })
    );
  };

  return (
    // Provide values and functions to the AuthContext for use across the app
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

// Custom hook for accessing AuthContext
export const useAuth = () => useContext(AuthContext);
