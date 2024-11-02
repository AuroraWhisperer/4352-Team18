import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ShopNestedNavigator from "../../Navigation/ShopNestedNavigator";
import ShopHeader from "../Shop/ShopHeader";

// Main ShopScreen component
const ShopScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Shop screen header */}
      <ShopHeader />

      {/* Tab navigator for different shop categories */}
      <ShopNestedNavigator />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ShopScreen;
