import React, { useContext } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { ShopItems } from "../../context/ShopItems";
import CallToAction from "../../components/Display/CallToAction";
import Furniture from "../../components/Display/PocketProducts/Furniture";

export default function FurnitureScreen_Pocket() {
  // Retrieve purchased furniture items from the ShopItems context
  const { purchasedFurnitureItems } = useContext(ShopItems);

  return (
    <SafeAreaView style={styles.container}>
      {/* Conditionally render the Furniture component or CallToAction */}
      {purchasedFurnitureItems && purchasedFurnitureItems.length > 0 ? (
        <Furniture />
      ) : (
        <CallToAction screenName="FurnitureScreen" />
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
