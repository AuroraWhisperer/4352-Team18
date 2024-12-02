import React, { useContext } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { ShopItems } from "../../context/ShopItems";
import CallToAction from "../../components/Display/CallToAction";
import Accessories from "../../components/Display/PocketProducts/Accessories";

export default function AccessoriesScreen_Pocket() {
  // Access purchased accessories from the ShopItems context
  const { purchasedAccessoriesItems } = useContext(ShopItems);

  return (
    <SafeAreaView style={styles.container}>
      {/* Conditionally render either the Accessories component or CallToAction */}
      {purchasedAccessoriesItems && purchasedAccessoriesItems.length > 0 ? (
        <Accessories />
      ) : (
        <CallToAction screenName="AccessoriesScreen" />
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
