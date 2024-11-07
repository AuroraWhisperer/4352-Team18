import React from "react";
import { AuthProvider } from "./AuthContext";
import { MainProvider } from "./MainContext";
import { ShopItemsProvider } from "./ShopItems";
import { TaskProvider } from "./TaskContext";

// AppProvider component to wrap the entire app with multiple context providers
export const AppProvider = ({ children }) => (
  <AuthProvider>
    <MainProvider>
      <ShopItemsProvider>
        <TaskProvider>{children}</TaskProvider>
      </ShopItemsProvider>
    </MainProvider>
  </AuthProvider>
);
