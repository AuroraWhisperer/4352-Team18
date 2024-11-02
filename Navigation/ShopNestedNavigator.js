import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AccessoriesScreen from "../Screen/Shop/AccessoriesScreen.js";
import ClothesScreen from "../Screen/Shop/ClothesScreen.js";
import FoodScreen from "../Screen/Shop/FoodScreen.js";
import FurnitureScreen from "../Screen/Shop/FurnitureScreen.js";
import ToysScreen from "../Screen/Shop/ToysScreen.js";

const ShopTab = createMaterialTopTabNavigator();

const ShopNestedNavigator = () => (
  <ShopTab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "gray",
      tabBarIndicatorStyle: { backgroundColor: "black", height: 2 },
      tabBarLabelStyle: { fontSize: 10 },
      tabBarStyle: { backgroundColor: "#F7E4C6" },
    }}
  >
    {/* Define each screen in the shop tab navigator with header hidden */}
    <ShopTab.Screen
      name="Clothes"
      component={ClothesScreen}
      options={{ headerShown: false }}
    />
    <ShopTab.Screen
      name="Accessories"
      component={AccessoriesScreen}
      options={{ headerShown: false }}
    />
    <ShopTab.Screen
      name="Food"
      component={FoodScreen}
      options={{ headerShown: false }}
    />
    <ShopTab.Screen
      name="Toys"
      component={ToysScreen}
      options={{ headerShown: false }}
    />
    <ShopTab.Screen
      name="Furniture"
      component={FurnitureScreen}
      options={{ headerShown: false }}
    />
  </ShopTab.Navigator>
);

export default ShopNestedNavigator;
