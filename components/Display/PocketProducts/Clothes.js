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
import { useAuth } from "../../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Clothes() {
  const { purchasedClothesItems, setPurchasedClothesItems } =
    useContext(ShopItems);

  const {
    username,
    happiness,
    setHappiness,
    health,
    setHealth,
    hunger,
    setHunger,
    savePetAttributes,
    updateAttributes,
  } = useAuth();

  const numColumns = 3;
  const filledItems = [...purchasedClothesItems];

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
          onPress: async () => {
            console.log("Using item:", item);

            // Remove the used item from the purchased items list
            const updatedItems = purchasedClothesItems.filter(
              (accessory) => accessory.uniqueKey !== item.uniqueKey
            );
            setPurchasedClothesItems(updatedItems);
            // console.log("Updated items after removal:", updatedItems);

            // Save updated list to AsyncStorage
            try {
              await AsyncStorage.setItem(
                `purchasedClothesItems_${username}`,
                JSON.stringify(updatedItems)
              );
              console.log("Updated items saved to AsyncStorage.");
            } catch (error) {
              console.log("Error saving updated items to AsyncStorage:", error);
            }

            // Update attributes upon using the item
            setHealth((prev) => {
              const newHealth = Math.min(prev + 2, 5);
              savePetAttributes(username, newHealth, happiness, hunger);
              return newHealth;
            });

            console.log(`Finished using ${item.name}`);
          },
        },
      ],
      { cancelable: true }
    );
  };

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
    return undefined;
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
