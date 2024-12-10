import React from "react";
import { useFonts } from "expo-font";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AccessoriesScreen_Pocket from "../Screen/Pocket/AccessoriesScreen_Pocket.js";
import ClothesScreen_Pocket from "../Screen/Pocket/ClothesScreen_Pocket.js";
import FoodScreen_Pocket from "../Screen/Pocket/FoodScreen_Pocket.js";
import FurnitureScreen_Pocket from "../Screen/Pocket/FurnitureScreen_Pocket.js";
import ToysScreen_Pocket from "../Screen/Pocket/ToysScreen_Pocket.js";

const PocketTab = createMaterialTopTabNavigator();

const PocketNestedNavigator = () => (
  <PocketTab.Navigator
    screenOptions={{
      swipeEnabled: true,
      lazy: true,
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "gray",
      tabBarIndicatorStyle: { backgroundColor: "black", height: 2 },
      tabBarLabelStyle: { fontSize: 12, fontFamily: 'MarkoOne-Regular' },
      tabBarStyle: { backgroundColor: "#F7E4C6" },
    }}
  >
    {/* Define each screen in the tab navigator with the header hidden */}
    <PocketTab.Screen
      name="Clothes"
      component={ClothesScreen_Pocket}
      options={{ headerShown: false }}
    />
    <PocketTab.Screen
      name="Accessories"
      component={AccessoriesScreen_Pocket}
      options={{ headerShown: false }}
    />
    <PocketTab.Screen
      name="Food"
      component={FoodScreen_Pocket}
      options={{ headerShown: false }}
    />
    <PocketTab.Screen
      name="Toys"
      component={ToysScreen_Pocket}
      options={{ headerShown: false }}
    />
    <PocketTab.Screen
      name="Furniture"
      component={FurnitureScreen_Pocket}
      options={{ headerShown: false }}
    />
  </PocketTab.Navigator>
);

export default PocketNestedNavigator;
