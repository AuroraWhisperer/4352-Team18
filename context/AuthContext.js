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
  const [familyCode, setFamilyCode] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [taskCount, setTaskCount] = useState(0);
  const [level, setLevel] = useState(1);
  const [happiness, setHappiness] = useState(0);
  const [health, setHealth] = useState(0);
  const [hunger, setHunger] = useState(5);

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
          console.log("Admin accounts is initialized");
        } else {
          console.log("Admin accounts already initialized.");
        }
      } catch (error) {
        console.error("Error initializing admin accounts", error);
      }
    };

    initAdminAccounts();
  }, []);

  useEffect(() => {
    const loadPetAttributes = async () => {
      if (!username) {
        console.log(
          "Username is not defined. Skipping pet attributes loading."
        );
        return;
      }

      try {
        const storedHappiness = await AsyncStorage.getItem(
          `happiness_${username}`
        );
        const storedHealth = await AsyncStorage.getItem(`health_${username}`);
        const storedHunger = await AsyncStorage.getItem(`hunger_${username}`);

        setHappiness(storedHappiness ? parseInt(storedHappiness) : 0);
        setHealth(storedHealth ? parseInt(storedHealth) : 0);
        setHunger(storedHunger ? parseInt(storedHunger) : 5);

        // console.log(`Loaded pet attributes for ${username}:`, {
        //   happiness: storedHappiness,
        //   health: storedHealth,
        //   hunger: storedHunger,
        // });
      } catch (error) {
        console.error("Failed to load pet attributes:", error);
      }
    };

    loadPetAttributes();
  }, [username]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nonZeroAttributes = [];
      if (happiness > 0) nonZeroAttributes.push("happiness");
      if (hunger > 0) nonZeroAttributes.push("hunger");
      if (health > 0) nonZeroAttributes.push("health");

      if (nonZeroAttributes.length > 0) {
        const randomAttribute =
          nonZeroAttributes[
            Math.floor(Math.random() * nonZeroAttributes.length)
          ];

        if (randomAttribute === "happiness") {
          setHappiness((prevHappiness) => {
            const newHappiness = Math.max(0, prevHappiness - 1);
            savePetAttributes(username);
            return newHappiness;
          });
        } else if (randomAttribute === "hunger") {
          setHunger((prevHunger) => {
            const newHunger = Math.max(0, prevHunger - 1);
            savePetAttributes(username);
            return newHunger;
          });
        } else if (randomAttribute === "health") {
          setHealth((prevHealth) => {
            const newHealth = Math.max(0, prevHealth - 1);
            savePetAttributes(username);
            return newHealth;
          });
        }
      }
    }, 6000000);

    return () => clearInterval(interval);
  }, [username, happiness, hunger, health]);

  const loadTaskProgress = async (username) => {
    try {
      const storedTaskCount = await AsyncStorage.getItem(`tasks_${username}`);
      const storedLevel = await AsyncStorage.getItem(`level_${username}`);
      setTaskCount(storedTaskCount ? parseInt(storedTaskCount) : 0);
      setLevel(storedLevel ? parseInt(storedLevel) : 1);
    } catch (error) {
      console.error("Failed to load task progress:", error);
    }
  };

  // Handle admin login by validating stored data
  const handleAdminLogin = async (username, password) => {
    try {
      const prefixedUsername = `admin_${username}`;
      const adminData = await AsyncStorage.getItem(prefixedUsername);

      if (adminData) {
        const admin = JSON.parse(adminData);
        if (admin.username === username && admin.password === password) {
          setUsername(username);
          setCurrentUser(admin);
          setIsAdmin(true);

          setLevel(1);

          const userData = await AsyncStorage.getItem(`data_${username}`);
          const parsedData = userData ? JSON.parse(userData) : {};

          setPetname(parsedData.petname || admin.petname || "Luna");
          setFamilyName(username);

          setIsAdmin(true);
          await loadLevelFromStorage(username); // Load level data for admin
          await loadPetAttributes(username);
          // console.log(
          //   `Admin login successful. Pet name: ${parsedData.petname || "Luna"}`
          // );
          // console.log("目前属性", happiness, hunger, health);
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
  const handleLogout = async (navigation) => {
    try {
      // DevSettings.reload();
      // navigation.replace("StartScreen");
      resetApp();
      setUsername("");
      setCurrentUser(null);
      setPetname("Luna");
      setLevel(0);
      setHappiness(0);
      setHealth(0);
      setHunger(5);
      setTaskCount(0);

      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Save user-specific data to AsyncStorage
  const saveUserData = async (username, data) => {
    try {
      // console.log(`Attempting to save data for ${username}:`, data);
      await AsyncStorage.setItem(`data_${username}`, JSON.stringify(data));
      console.log(`Successfully saved data for ${username}`);
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  const updatePetname = async (newPetname) => {
    setPetname(newPetname);
    if (username) {
      const userKey = `data_${username}`;
      const storedData = await AsyncStorage.getItem(userKey);
      const parsedData = storedData ? JSON.parse(storedData) : {};
      parsedData.petname = newPetname;

      await saveUserData(username, parsedData);
      console.log(` ${username} -> ${newPetname}`);
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

          setLevel(1);

          const storedData = await AsyncStorage.getItem(`data_${username}`);
          const parsedData = storedData ? JSON.parse(storedData) : {};

          setPetname(parsedData.petname || user.petname || "Luna");
          setFamilyName(parsedData.familyname || "");
          setFamilyCode(user.familyCode || parsedData.familyCode || "");

          await loadLevelFromStorage(username); // Load user's level
          await loadPetAttributes(username);

          // console.log(
          //   `User login successful. Pet name: ${parsedData.petname || "Luna"}`
          // );
          // console.log(
          //   `User login successful. Family code: ${
          //     user.familyCode || parsedData.familyCode
          //   }`
          // );
          console.log("目前属性", happiness, hunger, health);
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

  // New function to handle login by family code
  const handleFamilyCode = async (inputFamilyCode) => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const userKeys = allKeys.filter((key) => key.startsWith("user_"));

      let matchedUser = null;
      for (let key of userKeys) {
        const userDataString = await AsyncStorage.getItem(key);
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          if (userData.familyCode === inputFamilyCode) {
            matchedUser = userData;
            break;
          }
        }
      }

      if (matchedUser) {
        const isUser = await handleUserLogin(
          matchedUser.username,
          matchedUser.password || ""
        );
        if (isUser) {
          console.log(
            "Family code login successful and redirected with username:",
            matchedUser.username
          );
          return true;
        } else {
          console.log(
            "Family code login failed, unable to log in with username."
          );
          return false;
        }
      } else {
        console.log("Invalid family code");
        return false;
      }
    } catch (error) {
      console.error("Error logging in with family code:", error);
      return false;
    }
  };

  // Register a new user and store them in AsyncStorage
  const registerUser = async (newUser) => {
    try {
      const userKey = `user_${newUser.username}`;

      // const adminUsernames = ["katie", "mikayla", "tom", "hamzah"];
      // if (adminUsernames.includes(newUser.username)) {
      //   console.log("Username is reserved for admin accounts");
      //   alert("Username already exists, please select another username");
      //   return false;
      // }

      const existingUser = await AsyncStorage.getItem(userKey);
      if (existingUser) {
        console.log("Username already exists");
        alert("Username already exists, please select another username");
        return false;
      }

      const familyCode = generateRandomCode();
      setFamilyCode(familyCode); // Log setFamilyCode call here
      console.log(
        `Setting familyCode for new user ${newUser.username}: ${familyCode}`
      );

      // Store the new user data
      const newUserWithDetails = {
        ...newUser,
        petname: "Luna",
        familyname: "",
        familyCode,
      };

      await AsyncStorage.setItem(userKey, JSON.stringify(newUserWithDetails));
      // setUsers((prevUsers) => [...prevUsers, newUserWithDetails]);

      console.log(
        "User registered successfully with details:",
        newUserWithDetails
      );
      return true;
    } catch (error) {
      console.error("Failed to register user:", error);
      return false;
    }
  };

  // Helper function to generate a random family code
  const generateRandomCode = () => {
    const letters = Array.from({ length: 4 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join("");
    const digits = Math.floor(100 + Math.random() * 900).toString();
    return `${letters}${digits}`;
  };

  const saveLevelToStorage = async (newLevel) => {
    try {
      if (username) {
        await AsyncStorage.setItem(
          `level_${username}`,
          JSON.stringify(newLevel)
        );
        setLevel(newLevel); // Update level state
        console.log("Level saved successfully for", username);
      }
    } catch (error) {
      console.error("Failed to save level:", error);
    }
  };

  const loadLevelFromStorage = async (username) => {
    try {
      const storedLevel = await AsyncStorage.getItem(`level_${username}`);
      if (storedLevel) {
        setLevel(parseInt(storedLevel, 10));
        console.log("Loaded level for", username, ":", storedLevel);
      } else {
        console.log("No stored level found for", username);
      }
    } catch (error) {
      console.error("Failed to load level:", error);
    }
  };

  const updateLevel = (newLevel) => {
    setLevel(newLevel); // Update level state
    saveLevelToStorage(newLevel); // Save new level to storage
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

  const savePetAttributes = async (username) => {
    try {
      await AsyncStorage.setItem(
        `happiness_${username}`,
        JSON.stringify(happiness)
      );
      await AsyncStorage.setItem(`health_${username}`, JSON.stringify(health));
      await AsyncStorage.setItem(`hunger_${username}`, JSON.stringify(hunger));
      console.log("Pet attributes saved successfully for", username);
    } catch (error) {
      console.error("Failed to save pet attributes:", error);
    }
  };

  const loadPetAttributes = async (username) => {
    try {
      const storedHappiness = await AsyncStorage.getItem(
        `happiness_${username}`
      );
      const storedHealth = await AsyncStorage.getItem(`health_${username}`);
      const storedHunger = await AsyncStorage.getItem(`hunger_${username}`);

      setHappiness(storedHappiness ? parseInt(storedHappiness) : 0);
      setHealth(storedHealth ? parseInt(storedHealth) : 0);
      setHunger(storedHunger ? parseInt(storedHunger) : 5);

      // console.log("Loaded pet attributes for", username);
    } catch (error) {
      console.error("Failed to load pet attributes:", error);
    }
  };

  const updateHappiness = (newHappiness) => {
    setHappiness(newHappiness);
    if (username) savePetAttributes(username);
  };

  const updateHealth = (newHealth) => {
    setHealth(newHealth);
    if (username) savePetAttributes(username);
  };

  const updateHunger = (newHunger) => {
    setHunger(newHunger);
    if (username) savePetAttributes(username);
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
        familyCode,
        setFamilyCode,
        handleFamilyCode,
        level,
        updateLevel,
        saveLevelToStorage,
        loadLevelFromStorage,
        happiness,
        setHappiness,
        health,
        setHealth,
        hunger,
        setHunger,
        updateHappiness,
        updateHealth,
        updateHunger,
        savePetAttributes,
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
