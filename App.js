import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./Screen/Auth/StartScreen";
import TabNavigator from "./Navigation/TabNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddGoalsScreen from "./Screen/Goals/AddGoalsScreen";
import { AppProvider } from "./context/AppProvider";
import SignInScreen1 from "./Screen/Auth/SignInScreen1";
import StartPage from "./Screen/Auth/StartPage";
import GoalsScreen from "./Screen/Main/GoalsScreen.js";
import PetDetailsScreen from "./Screen/PetDetails/PetDetailsScreen.js";
import PostGoalsScreen from "./Screen/Goals/PostGoalsScreen.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PocketScreen from "./Screen/Main/PocketScreen.js";
import ShopScreen from "./Screen/Main/ShopScreen.js";

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// this code is for debug specfic page

// export default function App() {
//   return (
//     <AppProvider>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen
//             name="PocketScreen"
//             component={PocketScreen}
//             options={{ headerShown: false }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AppProvider>
//   );
// }



export default function App() {
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
          {/* <Stack.Screen
            name="ShopScreen"
            component={TabNavigator}
            options={{ headerShown: false }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}