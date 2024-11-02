import React, { useContext } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { ShopItems } from "../../context/ShopItems";
import CallToAction from "../../components/Display/CallToAction";
import Food from "../../components/Display/PocketProducts/Food";

export default function FoodScreen() {
  const { purchasedFoodItems } = useContext(ShopItems);

  return (
    <SafeAreaView style={styles.container}>
      {purchasedFoodItems && purchasedFoodItems.length > 0 ? (
        <Food />
      ) : (
        <CallToAction screenName="FoodScreen" />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF4E7",
  },
});
