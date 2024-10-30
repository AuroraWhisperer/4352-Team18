import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./Screen/Auth/StartScreen";
import TabNavigator from "./Navigation/TabNavigator";
import AddGoalsScreen from "./Screen/Goals/AddGoalsScreen";
import { AppProvider } from "./context/AppContext";
import SignInScreen1 from "./Screen/Auth/SignInScreen1";
import StartPage from "./Screen/Auth/StartPage";
import GoalsScreen from "./Screen/Main/GoalsScreen.js";
import PetDetailsScreen from "./Screen/PetDetails/PetDetailsScreen.js";
import PostGoalsScreen from "./Screen/Goals/PostGoalsScreen.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

// this code is for debug specfic page

// export default function App() {
//   return (
//     <AppProvider>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen
//             name="ProfileScreen"
//             component={TabNavigator}
//             options={{ headerShown: false }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AppProvider>
//   );
// }

export default function App() {
  // this code is for clean the storage
    // useEffect(() => {
    //   const clearStorage = async () => {
    //     try {
    //       await AsyncStorage.clear();
    //       console.log("Storage cleared on app start");
    //     } catch (error) {
    //       console.log("Failed to clear storage:", error);
    //     }
    //   };
    //   clearStorage();
    // }, []);

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartScreen">
          <Stack.Screen
            name="StartScreen"
            component={StartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StartPage"
            component={StartPage}
            options={{ headerShown: false, headerBackTitleVisible: false }}
          />
          <Stack.Screen
            name="SignInScreen1"
            component={SignInScreen1}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddGoalsScreen"
            component={AddGoalsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GoalsStack"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PetDetails"
            component={PetDetailsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PostGoalsScreen"
            component={PostGoalsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
