import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create ShopItems context
export const ShopItems = createContext();

// ShopItemsProvider component to provide shop-related data and functions
export const ShopItemsProvider = ({ children }) => {
  // State variables for each category of purchased items
  const [purchasedClothesItems, setPurchasedClothesItems] = useState([]);
  const [purchasedAccessoriesItems, setPurchasedAccessoriesItems] = useState(
    []
  );
  const [purchasedFoodItems, setPurchasedFoodItems] = useState([]);
  const [purchasedFurnitureItems, setPurchasedFurnitureItems] = useState([]);
  const [purchasedToysItems, setPurchasedToysItems] = useState([]);

  // Load purchased items from AsyncStorage on component mount
  useEffect(() => {
    const loadPurchasedItems = async () => {
      try {
        // Retrieve stored items for each category
        const storedClothes = await AsyncStorage.getItem(
          "purchasedClothesItems"
        );
        const storedAccessories = await AsyncStorage.getItem(
          "purchasedAccessoriesItems"
        );
        const storedFood = await AsyncStorage.getItem("purchasedFoodItems");
        const storedFurniture = await AsyncStorage.getItem(
          "purchasedFurnitureItems"
        );
        const storedToys = await AsyncStorage.getItem("purchasedToysItems");

        // Parse and set state if data exists in AsyncStorage
        if (storedClothes) setPurchasedClothesItems(JSON.parse(storedClothes));
        if (storedAccessories)
          setPurchasedAccessoriesItems(JSON.parse(storedAccessories));
        if (storedFood) setPurchasedFoodItems(JSON.parse(storedFood));
        if (storedFurniture)
          setPurchasedFurnitureItems(JSON.parse(storedFurniture));
        if (storedToys) setPurchasedToysItems(JSON.parse(storedToys));
      } catch (error) {
        console.log("Error loading purchased items:", error);
      }
    };
    loadPurchasedItems();
  }, []);

  // Function to add a new purchased item to the appropriate category
  const addPurchasedItem = async (item, category) => {
    switch (category) {
      case "clothes":
        const updatedClothesItems = [...purchasedClothesItems, item];
        setPurchasedClothesItems(updatedClothesItems);
        await AsyncStorage.setItem(
          "purchasedClothesItems",
          JSON.stringify(updatedClothesItems)
        );
        console.log("Updated Clothes Items:", updatedClothesItems);
        break;
      case "accessories":
        const updatedAccessoriesItems = [...purchasedAccessoriesItems, item];
        setPurchasedAccessoriesItems(updatedAccessoriesItems);
        await AsyncStorage.setItem(
          "purchasedAccessoriesItems",
          JSON.stringify(updatedAccessoriesItems)
        );
        console.log("Updated Accessories Items:", updatedAccessoriesItems);
        break;
      case "food":
        const updatedFoodItems = [...purchasedFoodItems, item];
        setPurchasedFoodItems(updatedFoodItems);
        await AsyncStorage.setItem(
          "purchasedFoodItems",
          JSON.stringify(updatedFoodItems)
        );
        console.log("Updated Food Items:", updatedFoodItems);
        break;
      case "furniture":
        const updatedFurnitureItems = [...purchasedFurnitureItems, item];
        setPurchasedFurnitureItems(updatedFurnitureItems);
        await AsyncStorage.setItem(
          "purchasedFurnitureItems",
          JSON.stringify(updatedFurnitureItems)
        );
        console.log("Updated Furniture Items:", updatedFurnitureItems);
        break;
      case "toys":
        const updatedToysItems = [...purchasedToysItems, item];
        setPurchasedToysItems(updatedToysItems);
        await AsyncStorage.setItem(
          "purchasedToysItems",
          JSON.stringify(updatedToysItems)
        );
        console.log("Updated Toys Items:", updatedToysItems);
        break;
      default:
        console.log("Unknown category:", category);
        break;
    }
  };

  return (
    // Provide values and functions to the ShopItems context for use across the app
    <ShopItems.Provider
      value={{
        purchasedClothesItems,
        purchasedAccessoriesItems,
        purchasedFoodItems,
        purchasedFurnitureItems,
        purchasedToysItems,
        addPurchasedItem,
      }}
    >
      {children}
    </ShopItems.Provider>
  );
};
