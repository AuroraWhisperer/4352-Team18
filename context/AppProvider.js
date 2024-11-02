import React from "react";
import { AuthProvider } from "./AuthContext";
import { MainProvider } from "./MainContext";
import { ShopItemsProvider } from "./ShopItems";

export const AppProvider = ({ children }) => (
  <AuthProvider>
    <MainProvider>
      <ShopItemsProvider>{children}</ShopItemsProvider>
    </MainProvider>
  </AuthProvider>
);
