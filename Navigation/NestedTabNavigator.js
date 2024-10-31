import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AccessoriesScreen from "../Screen/Pocket/AccessoriesScreen.js";
import ClothesScreen from "../Screen/Pocket/ClothesScreen.js";
import FoodScreen from "../Screen/Pocket/FoodScreen.js";
import FurnitureScreen from "../Screen/Pocket/FurnitureScreen.js";
import ToysScreen from "../Screen/Pocket/ToysScreen.js";

const PocketTab = createMaterialTopTabNavigator();

const NestedTabNavigator = () => (
  <PocketTab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "gray",
      tabBarIndicatorStyle: { backgroundColor: "black", height: 2 },
      tabBarLabelStyle: { fontSize: 12 },
      tabBarStyle: { backgroundColor: "#F7E4C6" },
    }}
  >
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

export default NestedTabNavigator;
