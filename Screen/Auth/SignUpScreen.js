import AsyncStorage from "@react-native-async-storage/async-storage";

const handleSignUp = async (email, password) => {
  try {
    const user = { email, password };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    alert("Registration Successful");
  } catch (error) {
    console.error(error);
    alert("Registration Failed");
  }
};
