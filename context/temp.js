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

        setPetname(parsedData.petname || admin.petname || "Luna");
        setFamilyName(username);

        setIsAdmin(true);
        console.log(
          `Admin login successful. Pet name: ${parsedData.petname || "Luna"}`
        );
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error during admin login", error);
    return false;
  }
};

const handleUserLogin = async (username, password) => {
  try {
    const userKey = `user_${username}`;
    const userData = await AsyncStorage.getItem(userKey);

    if (userData) {
      const user = JSON.parse(userData);

      if (user.username === username && user.password === password) {
        setUsername(username);
        setCurrentUser(user);
        setIsAdmin(false);

        const storedData = await AsyncStorage.getItem(`data_${username}`);
        const parsedData = storedData ? JSON.parse(storedData) : {};

        // Ensure petname is set correctly
        setPetname(parsedData.petname || user.petname || "Luna");
        setFamilyName(parsedData.familyname || "");
        setFamilyCode(user.familyCode || parsedData.familyCode || "");

        console.log(
          `User login successful. Pet name: ${parsedData.petname || "Luna"}`
        );
        return true;
      }
    }

    console.log("Invalid username or password");
    return false;
  } catch (error) {
    console.error("Error during user login", error);
    return false;
  }
};
