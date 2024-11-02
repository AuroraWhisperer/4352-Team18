import React, { useContext } from "react";
import { View, FlatList, Image, StyleSheet, Dimensions } from "react-native";
import { ShopItems } from "../../../context/ShopItems";

export default function Furniture() {
  const { purchasedFurnitureItems } = useContext(ShopItems);

  const numColumns = 3;
  const filledItems = [...purchasedFurnitureItems];

  while (filledItems.length % numColumns !== 0) {
    filledItems.push({
      id: `empty-${filledItems.length}-${Math.random()}`,
      empty: true,
    });
  }

  const renderItem = ({ item }) => {
    if (item.empty) {
      return <View style={[styles.productContainer, styles.emptyProduct]} />;
    }
    return (
      <View style={styles.productContainer}>
        <Image source={item.image} style={styles.productImage} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filledItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingVertical: 10,
  },
  row: {
    justifyContent: "space-around",
  },
  productContainer: {
    alignItems: "center",
    marginVertical: 25,
    width: "30%",
  },
  emptyProduct: {
    backgroundColor: "transparent",
  },
  productImage: {
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").width * 0.2,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 14,
    marginTop: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  diamondImage: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  productPrice: {
    fontSize: 14,
    color: "#333",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
