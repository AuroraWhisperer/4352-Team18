import React from 'react';
import { View, Text, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function Home() {
  return (
    <View style={{ flex: 1, backgroundColor: "#F6E3C5" }}>
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        No Upcoming Goals
      </Text>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home Tab" component={Home} />
      {/* Add more screens inside DrawerNavigator if needed */}
    </Drawer.Navigator>
  );
}
