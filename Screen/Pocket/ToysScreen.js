import React, { useContext } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { ShopItems } from "../../context/ShopItems";
import CallToAction from "../../components/Display/CallToAction";
import Toys from "../../components/Display/PocketProducts/Toys";

export default function ToysScreen() {
  const { purchasedToysItems } = useContext(ShopItems);

  return (
    <SafeAreaView style={styles.container}>
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
