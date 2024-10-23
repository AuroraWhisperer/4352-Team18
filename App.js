import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./Screen/StartScreen";
import TabNavigator from "./Navigation/TabNavigator";
import AddGoalsScreen from "./Screen/Goals/AddGoalsScreen";
import { GoalProvider } from "./context/GoalContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <GoalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartScreen">
          <Stack.Screen
            name="StartScreen"
            component={StartScreen}
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
    </GoalProvider>
  );
}
