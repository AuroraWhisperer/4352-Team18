import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useMain } from "../../../context/MainContext";
import { ShopItems } from "../../../context/ShopItems";

// Array of product items with details
const products = [
  {
    id: "1",
    name: "item1",
    price: 200,
    image: require("../../../assets/images/shop/Toys/1.png"),
  },
  {
    id: "2",
    name: "item2",
    price: 200,
    image: require("../../../assets/images/shop/Toys/2.png"),
  },
  {
    id: "3",
    name: "item3",
    price: 200,
    image: require("../../../assets/images/shop/Toys/3.png"),
  },
  {
    id: "4",
    name: "item4",
    price: 200,
    image: require("../../../assets/images/shop/Toys/4.png"),
  },
  {
    id: "5",
    name: "item5",
    price: 200,
    image: require("../../../assets/images/shop/Toys/5.png"),
  },
];

export default function Toys() {
  const { totalDiamonds, reduceDiamondsFromTotal } = useMain();

  const category = "toys";
  const { addPurchasedItem } = useContext(ShopItems);

  const numColumns = 3;
  const filledProducts = [...products];

  // Add empty items to fill grid, ensuring each row is complete
  while (filledProducts.length % numColumns !== 0) {
    filledProducts.push({ id: `empty-${filledProducts.length}`, empty: true });
  }

  // Function to handle item purchase on press
  const handlePress = (item) => {
    if (totalDiamonds >= item.price) {
      Alert.alert("Confirm Purchase", `Do you want to get this item?`, [
        {
          text: "Meow...",
          style: "cancel",
        },
        {
          text: "Yes!",
          onPress: () => {
            reduceDiamondsFromTotal(item.price);
            addPurchasedItem(item, category);
          },
        },
      ]);
    } else {
      Alert.alert(
        "Insufficient Diamonds",
        `Spend more time with your family!`,
        [{ text: "MEOW!" }]
      );
    }
  };

  // Render each item in the grid
  const renderItem = ({ item }) => {
    if (item.empty) {
      return <View style={[styles.productContainer, styles.emptyProduct]} />;
    }
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => handlePress(item)}
      >
        <Image source={item.image} style={styles.productImage} />
        <View style={styles.priceContainer}>
          <Image
            source={require("../../../assets/images/diamond.png")}
            style={styles.diamondImage}
          />
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Container for the FlatList
  return (
    <View style={styles.container}>
      <FlatList
        data={filledProducts}
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
    // backgroundColor: "#FAEBD7",
  },
  list: {
    paddingVertical: 10,
  },
  row: {
    justifyContent: "space-around",
  },
  productContainer: {
    alignItems: "center",
    marginVertical: 20,
    width: "30%",
  },
  emptyProduct: {
    backgroundColor: "transparent",
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
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
});