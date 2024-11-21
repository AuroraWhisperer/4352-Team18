import React, { useContext } from "react";
import { useFonts } from "expo-font";
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ShopItems } from "../../../context/ShopItems";

export default function Accessories() {
  const { purchasedAccessoriesItems, setPurchasedAccessoriesItems } =
    useContext(ShopItems);

  const numColumns = 3; // Set the number of columns for the grid
  const filledItems = [...purchasedAccessoriesItems];

  // Ensure the grid is filled, adding placeholder items if needed
  while (filledItems.length % numColumns !== 0) {
    filledItems.push({
      uniqueKey: `empty-${filledItems.length}-${Math.random()}`,
      empty: true,
    });
  }

  // Function to handle item click
  const handleItemPress = (item) => {
    if (item.empty) return;

    Alert.alert(
      "Item Clicked",
      `Do you want to use this item for your pet?`,
      [
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            // Remove the item based on uniqueKey
            setPurchasedAccessoriesItems((prevItems) =>
              prevItems.filter(
                (accessory) => accessory.uniqueKey !== item.uniqueKey
              )
            );
            console.log(`Yes, using ${item.name}`);
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Function to render each item in the grid
  const renderItem = ({ item }) => {
    if (item.empty) {
      return <View style={[styles.productContainer, styles.emptyProduct]} />;
    }
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => handleItemPress(item)}
        activeOpacity={0.7}
      >
        <Image source={item.image} style={styles.productImage} />
      </TouchableOpacity>
    );
  };

  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Return loading state if fonts are not loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filledItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.uniqueKey}
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
    fontFamily: "MarkoOne-Regular",
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
    fontFamily: "MarkoOne-Regular",
    color: "#333",
  },
  emptyText: {
    fontSize: 16,
    fontFamily: "MarkoOne-Regular",
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
