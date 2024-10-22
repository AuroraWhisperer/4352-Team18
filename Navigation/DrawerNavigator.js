import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../Screen/HomeScreen";
import CustomHeaderTitle from "./CustomHeaderTitle";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: 240,
          backgroundColor: "transparent",
        },
        overlayColor: "transparent",
        drawerType: "back",
        headerShown: true,
        headerTransparent: true,
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
        },
        headerTitle: (props) => <CustomHeaderTitle {...props} />,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
