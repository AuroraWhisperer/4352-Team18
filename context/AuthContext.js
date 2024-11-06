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
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [petname, setPetname] = useState("Luna");
  const [familyname, setFamilyName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Initialize admin accounts in AsyncStorage
  useEffect(() => {
    const initAdminAccounts = async () => {
      try {
        const existingAdminData = await AsyncStorage.getItem("admin_katie");

        if (!existingAdminData) {
          // // Remove existing admin accounts
          // await AsyncStorage.removeItem("admin_katie");
          // await AsyncStorage.removeItem("admin_mikayla");
          // await AsyncStorage.removeItem("admin_tom");
          // await AsyncStorage.removeItem("admin_hamzah");

          // Define new admin accounts
          const adminAccounts = [
            { username: "katie", password: "katie", petname: "Luna" },
            { username: "mikayla", password: "mikayla", petname: "Luna" },
            { username: "tom", password: "tom", petname: "Luna" },
            { username: "hamzah", password: "hamzah", petname: "Luna" },
          ];

          // Store each admin account in AsyncStorage
          for (const account of adminAccounts) {
            await AsyncStorage.setItem(
              `admin_${account.username}`,
              JSON.stringify(account)
            );
          }
          console.log("Admin accounts initialized");
        } else {
          console.log("Admin accounts already initialized.");
        }
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
          setCurrentUser(admin);

          const userData = await AsyncStorage.getItem(`data_${username}`);
          const parsedData = userData ? JSON.parse(userData) : {};
          setPetname(parsedData.petname || "Luna");

          setFamilyName(username);

          setIsAdmin(true);
          // console.log(
          //   `Admin login successful. Pet name: ${parsedData.petname || "Luna"}`
          // );
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
      setCurrentUser(null);
      setPetname("Luna");

      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Save user-specific data to AsyncStorage
  const saveUserData = async (username, data) => {
    try {
      console.log(`Saving data for ${username}:`, data);
      await AsyncStorage.setItem(`data_${username}`, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  const updatePetname = async (newPetname) => {
    setPetname(newPetname);
    if (username) {
      const data = { petname: newPetname };
      await saveUserData(username, data);
      console.log(`Updated pet name to ${newPetname} for user ${username}`);
    }
  };

  const updateFamilyName = async (newFamilyName) => {
    setFamilyName(newFamilyName);
    if (username) {
      const data = { familyname: newFamilyName };
      await saveUserData(username, data);
      console.log(
        `Updated family name to ${newFamilyName} for user ${username}`
      );
    }
  };

  // Handle regular user login by checking if user exists in AsyncStorage
  const handleUserLogin = async (username, password) => {
    try {
      const userKey = `user_${username}`;
      const userData = await AsyncStorage.getItem(userKey);

      if (userData) {
        const user = JSON.parse(userData);

        // Validate both username and password match
        if (user.username === username && user.password === password) {
          setUsername(username);
          setCurrentUser(user);
          setIsAdmin(false);

          const storedData = await AsyncStorage.getItem(`data_${username}`);
          const parsedData = storedData ? JSON.parse(storedData) : {};
          setPetname(parsedData.petname || "Luna");

          setFamilyName(parsedData.familyname || "");

          // console.log(
          //   `User login successful. Pet name: ${parsedData.petname || "Luna"}`
          // );
          return true;
        }
      }

      // If no match found, return false
      console.log("Invalid username or password");
      return false;
    } catch (error) {
      console.error("Error during user login", error);
      return false;
    }
  };

  // Register a new user and store them in AsyncStorage
  const registerUser = async (newUser) => {
    try {
      const userKey = `user_${newUser.username}`;

      const adminUsernames = ["katie", "mikayla", "tom", "hamzah"];
      if (adminUsernames.includes(newUser.username)) {
        console.log("Username is reserved for admin accounts");
        alert("Username already exists, please select another username");
        return false;
      }

      const existingUser = await AsyncStorage.getItem(userKey);
      if (existingUser) {
        console.log("Username already exists");
        alert("Username already exists, please select another username");
        return false;
      }

      // Store the new user data
      const newUserWithDetails = {
        ...newUser,
        petname: "Luna",
        familyname: { username },
      };

      await AsyncStorage.setItem(userKey, JSON.stringify(newUserWithDetails));
      setUsers((prevUsers) => [...prevUsers, newUserWithDetails]);

      console.log("User registered successfully:", newUserWithDetails);
      return true;
    } catch (error) {
      console.error("Failed to register user:", error);
      return false;
    }
  };

  // Clear all non-user-specific data from AsyncStorage
  const clearAsyncStorage = async () => {
    try {
      // const keys = await AsyncStorage.getAllKeys();
      // const nonUserKeys = keys.filter((key) => !key.startsWith("admin_"));
      // await AsyncStorage.multiRemove(nonUserKeys);
      await AsyncStorage.clear();
      console.log("Non-user data cleared from AsyncStorage");
      DevSettings.reload();
    } catch (error) {
      console.error("Failed to clear non-user data:", error);
    }
  };

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
        currentUser,
        handleAdminLogin,
        handleUserLogin,
        registerUser,
        saveUserData,
        clearAsyncStorage,
        petname,
        setPetname,
        updatePetname,
        familyname,
        setFamilyName,
        updateFamilyName,
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
