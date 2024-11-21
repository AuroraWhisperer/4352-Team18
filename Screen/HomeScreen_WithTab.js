/* import React from 'react';
import { useFonts } from 'expo-font';
import { View, Text, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function Home() {
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../assets/fonts/MarkoOne-Regular.ttf")
  });

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F6E3C5" }}>
      <Text style={{ textAlign: "center", marginTop: 20, fontFamily: 'MarkoOne-Regular', }}>
        No Upcoming Goals
      </Text>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home Tab" component={Home} />
    </Drawer.Navigator>
  );
}
 */