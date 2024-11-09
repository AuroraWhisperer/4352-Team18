import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./Screen/Auth/StartScreen";
import TabNavigator from "./Navigation/TabNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddGoalsScreen from "./Screen/Goals/AddGoalsScreen";
import { AppProvider } from "./context/AppProvider";
import SignInScreen1 from "./Screen/Auth/SignInScreen1";
import SignUpScreen from "./Screen/Auth/SignUpScreen";
import SignUpScreen2 from "./Screen/Auth/SignUpScreen2";
import SignUpScreen3 from "./Screen/Auth/SignUpScreen3";
import SignUpScreen4 from "./Screen/Auth/SignUpScreen4";
import SignUpScreen5 from "./Screen/Auth/SignUpScreen5";
import SignUpScreen6 from "./Screen/Auth/SignUpScreen6";
import FamilyCodeScreen from "./Screen/Auth/FamilyCodeScreen";
import StartPage from "./Screen/Auth/StartPage";
import GoalsScreen from "./Screen/Main/GoalsScreen.js";
import PetDetailsScreen from "./Screen/PetDetails/PetDetailsScreen.js";
import PostGoalsScreen from "./Screen/Goals/PostGoalsScreen.js";
import SettingsScreen from "./Screen/Profile/SettingsScreen.js";
import HistoryScreen from "./Screen/Profile/HistoryScreen.js";
import PocketScreen from "./Screen/Main/PocketScreen.js";
import ShopScreen from "./Screen/Main/ShopScreen.js";
import HistoryPostScreen from "./Screen/Profile/HistoryPostScreen.js";

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// this code is for debug specfic page

// export default function App() {
//   return (
//     <AppProvider>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen
//             name="HomeScreen"
//             component={TabNavigator}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="PetDetails"
//             component={PetDetailsScreen}
//             options={{ headerShown: false }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AppProvider>
//   );
// }

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
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
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen2"
            component={SignUpScreen2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen3"
            component={SignUpScreen3}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen4"
            component={SignUpScreen4}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen5"
            component={SignUpScreen5}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen6"
            component={SignUpScreen6}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FamilyCodeScreen"
            component={FamilyCodeScreen}
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
          {/* <Stack.Screen
            name="GoalsStack"
            component={TabNavigator}
            options={{ headerShown: false }}
          /> */}
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
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HistoryScreen"
            component={HistoryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HistoryPostScreen"
            component={HistoryPostScreen}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="ShopScreen"
            component={TabNavigator}
            options={{ headerShown: false }}
          /> */}
        </Stack.Navigator>
      </AppProvider>
    </NavigationContainer>
  );
}
