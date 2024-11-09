import React from "react";
import { useFonts } from "expo-font";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AccessoriesScreen from "../Screen/Pocket/AccessoriesScreen.js";
import ClothesScreen from "../Screen/Pocket/ClothesScreen.js";
import FoodScreen from "../Screen/Pocket/FoodScreen.js";
import FurnitureScreen from "../Screen/Pocket/FurnitureScreen.js";
import ToysScreen from "../Screen/Pocket/ToysScreen.js";

const PocketTab = createMaterialTopTabNavigator();

const PocketNestedNavigator = () => (
  <PocketTab.Navigator
    screenOptions={{
      swipeEnabled: true,
      lazy: true,
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "gray",
      tabBarIndicatorStyle: { backgroundColor: "black", height: 2 },
      tabBarLabelStyle: { fontSize: 10 },
      tabBarStyle: { backgroundColor: "#F7E4C6" },
    }}
  >
    {/* Define each screen in the tab navigator with the header hidden */}
    <PocketTab.Screen
      name="Clothes"
      component={ClothesScreen}
      options={{ headerShown: false }}
    />
    <PocketTab.Screen
      name="Accessories"
      component={AccessoriesScreen}
      options={{ headerShown: false }}
    />
    <PocketTab.Screen
      name="Food"
      component={FoodScreen}
      options={{ headerShown: false }}
    />
    <PocketTab.Screen
      name="Toys"
      component={ToysScreen}
      options={{ headerShown: false }}
    />
    <PocketTab.Screen
      name="Furniture"
      component={FurnitureScreen}
      options={{ headerShown: false }}
    />
  </PocketTab.Navigator>
);

export default PocketNestedNavigator;
