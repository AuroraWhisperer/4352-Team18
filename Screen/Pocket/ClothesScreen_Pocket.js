import React, { useContext } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { ShopItems } from "../../context/ShopItems";
import CallToAction from "../../components/Display/CallToAction";
import Clothes from "../../components/Display/PocketProducts/Clothes";

export default function ClothesScreen_Pocket() {
  // Access purchased clothes from the ShopItems context
  const { purchasedClothesItems } = useContext(ShopItems);

  return (
    <SafeAreaView style={styles.container}>
      {/* Conditionally render either the Clothes component or CallToAction */}
      {purchasedClothesItems && purchasedClothesItems.length > 0 ? (
        <Clothes />
      ) : (
        <CallToAction screenName="ClothesScreen" />
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
