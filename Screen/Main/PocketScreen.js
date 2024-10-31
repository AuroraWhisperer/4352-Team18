import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NestedTabNavigator from "../../Navigation/NestedTabNavigator";
import PocketHeader from "../Pocket/PocketHeader";

const PocketScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <PocketHeader />

      <NestedTabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    paddingBottom: 116,
  },
});

export default PocketScreen;
