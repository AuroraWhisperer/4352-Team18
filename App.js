import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./Screen/StartScreen";
import StartPage from "./Screen/StartPage";
import SignInScreen1 from "./Screen/SignInScreen1";
import TabNavigator from "./Navigation/TabNavigator";
import AddGoalsScreen from "./Screen/AddGoalsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
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
          options={{ headerShown: false }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
