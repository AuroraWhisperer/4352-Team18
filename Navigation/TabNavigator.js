import React from "react";
import { useFonts } from "expo-font";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../Screen/Main/HomeScreen";
import PocketScreen from "../Screen/Main/PocketScreen";
import GoalsScreen from "../Screen/Main/GoalsScreen";
import ShopScreen from "../Screen/Main/ShopScreen";
import ProfileScreen from "../Screen/Main/ProfileScreen";

const Tab = createMaterialTopTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          backgroundColor: "transparent",
          elevation: 0,
          borderWidth: 0,
        },
        tabBarLabelStyle: {
          fontFamily: "MarkoOne-Regular",
          fontSize: 10,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#D3D3D3",
        tabBarShowIcon: true,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="home" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Pocket"
        component={PocketScreen}
        options={{
          title: "Pocket",
          tabBarIcon: ({ color }) => (
            <Ionicons name="shield" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="GoalsTab"
        component={GoalsScreen}
        options={{
          title: "Goals",
          tabBarIcon: ({ color }) => (
            <Ionicons name="checkmark-circle" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          title: "Shop",
          tabBarIcon: ({ color }) => (
            <Ionicons name="basket" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
