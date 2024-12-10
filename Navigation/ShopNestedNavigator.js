import React from "react";
import { useRoute } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AccessoriesScreen_Shop from "../Screen/Shop/AccessoriesScreen_Shop.js";
import ClothesScreen_Shop from "../Screen/Shop/ClothesScreen_Shop.js";
import FoodScreen_Shop from "../Screen/Shop/FoodScreen_Shop.js";
import FurnitureScreen_Shop from "../Screen/Shop/FurnitureScreen_Shop.js";
import ToysScreen_Shop from "../Screen/Shop/ToysScreen_Shop.js";

const ShopTab = createMaterialTopTabNavigator();

const ShopNestedNavigator = () => {
  const route = useRoute();
  const initialCategory = route.params?.screen || "Clothes";

  return (
    <ShopTab.Navigator
      initialRouteName={initialCategory}
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarIndicatorStyle: { backgroundColor: "black", height: 2 },
        tabBarLabelStyle: { fontSize: 12, fontFamily: 'MarkoOne-Regular' },
        tabBarStyle: { backgroundColor: "#F7E4C6" },
      }}
    >
      {/* Define each screen in the shop tab navigator with header hidden */}
      <ShopTab.Screen
        name="Clothes"
        component={ClothesScreen_Shop}
        options={{ headerShown: false }}
      />
      <ShopTab.Screen
        name="Accessories"
        component={AccessoriesScreen_Shop}
        options={{ headerShown: false }}
      />
      <ShopTab.Screen
        name="Food"
        component={FoodScreen_Shop}
        options={{ headerShown: false }}
      />
      <ShopTab.Screen
        name="Toys"
        component={ToysScreen_Shop}
        options={{ headerShown: false }}
      />
      <ShopTab.Screen
        name="Furniture"
        component={FurnitureScreen_Shop}
        options={{ headerShown: false }}
      />
    </ShopTab.Navigator>
  );
};

export default ShopNestedNavigator;
