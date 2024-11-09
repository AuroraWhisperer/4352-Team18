import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthContext";
import { useTask } from "./TaskContext";
import uuid from "react-native-uuid";

// Create ShopItems context
export const ShopItems = createContext();

// ShopItemsProvider component to provide shop-related data and functions
export const ShopItemsProvider = ({ children }) => {
  const {
    username,
    happiness,
    setHappiness,
    health,
    setHealth,
    hunger,
    setHunger,
    savePetAttributes,
  } = useAuth();

  // State variables for each category of purchased items
  const [purchasedClothesItems, setPurchasedClothesItems] = useState([]);
  const [purchasedAccessoriesItems, setPurchasedAccessoriesItems] = useState(
    []
  );
  const [purchasedFoodItems, setPurchasedFoodItems] = useState([]);
  const [purchasedFurnitureItems, setPurchasedFurnitureItems] = useState([]);
  const [purchasedToysItems, setPurchasedToysItems] = useState([]);

  useEffect(() => {
    const loadPurchasedItems = async () => {
      try {
        if (username) {
          setPurchasedClothesItems([]);
          setPurchasedAccessoriesItems([]);
          setPurchasedFoodItems([]);
          setPurchasedFurnitureItems([]);
          setPurchasedToysItems([]);

          // Retrieve stored items for each category with username prefix
          const storedClothes = await AsyncStorage.getItem(
            `purchasedClothesItems_${username}`
          );
          const storedAccessories = await AsyncStorage.getItem(
            `purchasedAccessoriesItems_${username}`
          );
          const storedFood = await AsyncStorage.getItem(
            `purchasedFoodItems_${username}`
          );
          const storedFurniture = await AsyncStorage.getItem(
            `purchasedFurnitureItems_${username}`
          );
          const storedToys = await AsyncStorage.getItem(
            `purchasedToysItems_${username}`
          );

          // Parse and set state if data exists in AsyncStorage
          if (storedClothes) {
            setPurchasedClothesItems(JSON.parse(storedClothes));
          }

          if (storedAccessories) {
            setPurchasedAccessoriesItems(JSON.parse(storedAccessories));
          }

          if (storedFood) {
            setPurchasedFoodItems(JSON.parse(storedFood));
          }
          if (storedFurniture) {
            setPurchasedFurnitureItems(JSON.parse(storedFurniture));
          }

          if (storedToys) {
            setPurchasedToysItems(JSON.parse(storedToys));
          }
        }
      } catch (error) {
        console.log("Error loading purchased items:", error);
      }
    };
    loadPurchasedItems();
  }, [username]);

  // Function to add a new purchased item to the appropriate category
  const addPurchasedItem = async (item, category) => {
    if (!username) return;

    const itemWithUniqueKey = { ...item, uniqueKey: uuid.v4() };

    switch (category) {
      case "clothes":
        const updatedClothesItems = [
          ...purchasedClothesItems,
          itemWithUniqueKey,
        ];
        setPurchasedClothesItems(updatedClothesItems);
        await AsyncStorage.setItem(
          `purchasedClothesItems_${username}`,
          JSON.stringify(updatedClothesItems)
        );

        setHealth((prev) => {
          const newHealth = Math.min(prev + 1, 5);
          savePetAttributes(username, newHealth, happiness, hunger); // Save updated attributes
          return newHealth;
        });
        console.log("Updated Clothes Items:", updatedClothesItems);
        console.log(health);
        break;

      case "accessories":
        const updatedAccessoriesItems = [
          ...purchasedAccessoriesItems,
          itemWithUniqueKey,
        ];
        setPurchasedAccessoriesItems(updatedAccessoriesItems);
        await AsyncStorage.setItem(
          `purchasedAccessoriesItems_${username}`,
          JSON.stringify(updatedAccessoriesItems)
        );

        setHappiness((prev) => {
          const newHappiness = Math.min(prev + 1, 5);
          savePetAttributes(username, health, newHappiness, hunger); // Save updated attributes
          return newHappiness;
        });
        setHealth((prev) => {
          const newHealth = Math.min(prev + 1, 5);
          savePetAttributes(username, newHealth, happiness, hunger); // Save updated attributes
          return newHealth;
        });
        console.log("Updated Accessories Items:", updatedAccessoriesItems);
        break;

      case "food":
        const updatedFoodItems = [...purchasedFoodItems, itemWithUniqueKey];
        setPurchasedFoodItems(updatedFoodItems);
        await AsyncStorage.setItem(
          `purchasedFoodItems_${username}`,
          JSON.stringify(updatedFoodItems)
        );

        setHealth((prev) => {
          const newHealth = Math.min(prev + 1, 5);
          savePetAttributes(username, newHealth, happiness, hunger); // Save updated attributes
          return newHealth;
        });
        setHunger((prev) => {
          const newHunger = Math.min(prev + 1, 5);
          savePetAttributes(username, health, happiness, newHunger); // Save updated attributes
          return newHunger;
        });
        console.log("Updated Food Items:", updatedFoodItems);
        break;

      case "furniture":
        const updatedFurnitureItems = [
          ...purchasedFurnitureItems,
          itemWithUniqueKey,
        ];
        setPurchasedFurnitureItems(updatedFurnitureItems);
        await AsyncStorage.setItem(
          `purchasedFurnitureItems_${username}`,
          JSON.stringify(updatedFurnitureItems)
        );

        setHealth((prev) => {
          const newHealth = Math.min(prev + 1, 5);
          savePetAttributes(username, newHealth, happiness, hunger); // Save updated attributes
          return newHealth;
        });
        setHappiness((prev) => {
          const newHappiness = Math.min(prev + 1, 5);
          savePetAttributes(username, health, newHappiness, hunger); // Save updated attributes
          return newHappiness;
        });
        console.log("Updated Furniture Items:", updatedFurnitureItems);
        break;

      case "toys":
        const updatedToysItems = [...purchasedToysItems, itemWithUniqueKey];
        setPurchasedToysItems(updatedToysItems);
        await AsyncStorage.setItem(
          `purchasedToysItems_${username}`,
          JSON.stringify(updatedToysItems)
        );

        setHappiness((prev) => {
          const newHappiness = Math.min(prev + 1, 5);
          savePetAttributes(username, health, newHappiness, hunger); // Save updated attributes
          return newHappiness;
        });
        console.log("Updated Toys Items:", updatedToysItems);
        // console.log(happiness);
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
