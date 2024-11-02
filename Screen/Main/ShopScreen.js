import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ShopNestedNavigator from "../../Navigation/ShopNestedNavigator";
import ShopHeader from "../Shop/ShopHeader";

const ShopScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ShopHeader />

      <ShopNestedNavigator />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ShopScreen;
