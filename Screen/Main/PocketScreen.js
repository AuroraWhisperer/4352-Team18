import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PocketNestedNavigator from "../../Navigation/PocketNestedNavigator";
import PocketHeader from "../Pocket/PocketHeader";
import PocketProducts from "../../components/Display/PocketProducts";

const PocketScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Header for the PocketScreen */}
      <PocketHeader />

      {/* Nested Tab Navigator for different pocket categories */}
      <PocketNestedNavigator />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PocketScreen;
