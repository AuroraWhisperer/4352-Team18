import React from "react";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
// import Animated from "react-native-reanimated";
import HomeScreen from "../Screen/Main/HomeScreen";
import PocketScreen from "../Screen/Main/PocketScreen";
import GoalsScreen from "../Screen/Main/GoalsScreen";
import ShopScreen from "../Screen/Main/ShopScreen";
import ProfileScreen from "../Screen/Main/ProfileScreen";
import PocketNestedNavigator from "./PocketNestedNavigator";
import { Animated, Easing } from "react-native";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Return loading state if fonts are not loaded
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: false,
        headerShown: false,
        // animationEnabled: false,
        animation: "fade",
        transitionSpec: {
          animation: "timing",
          config: {
            duration: 150,
            easing: Easing.inOut(Easing.ease),
          },
        },
        sceneStyleInterpolator: ({ current }) => ({
          sceneStyle: {
            opacity: current.progress.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [0, 1, 0],
            }),
          },
        }),
        // lazy: true,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          backgroundColor: "transparent",
          elevation: 0,
          borderWidth: 0,
          borderTopWidth: 0,
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
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: "#9C8B71",
            height: 80,
          },
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
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: "#9C8B71",
            height: 80,
          },
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
        name="ShopTab"
        component={ShopScreen}
        options={{
          title: "Shop",
          tabBarIcon: ({ color }) => (
            <Ionicons name="basket" size={26} color={color} />
          ),
          tabBarStyle: { backgroundColor: "#9C8B71", height: 80 },
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
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: "#9C8B71",
            height: 80,
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
