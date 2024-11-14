import React, { useContext } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { ShopItems } from "../../context/ShopItems";
import CallToAction from "../../components/Display/CallToAction";
import Toys from "../../components/Display/PocketProducts/Toys";

export default function ToysScreen_Pocket() {
  // Access purchased toys from ShopItems context
  const { purchasedToysItems } = useContext(ShopItems);

  return (
    <SafeAreaView style={styles.container}>
      {/* Check if there are purchased toys; if yes, display them, otherwise show call-to-action */}
      {purchasedToysItems && purchasedToysItems.length > 0 ? (
        <Toys />
      ) : (
        <CallToAction screenName="ToysScreen" />
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
