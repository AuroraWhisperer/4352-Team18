import React, { createContext, useState } from "react";
import { AuthProvider } from "./AuthContext";
import { MainProvider } from "./MainContext";
import { ShopItemsProvider } from "./ShopItems";
import { TaskProvider } from "./TaskContext";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const forceRefresh = () => {
    setRefreshTrigger((prev) => !prev);
  };

  return (
    <AppContext.Provider value={{ refreshTrigger, forceRefresh }}>
      <AuthProvider>
        <MainProvider>
          <ShopItemsProvider>
            <TaskProvider>{children}</TaskProvider>
          </ShopItemsProvider>
        </MainProvider>
      </AuthProvider>
    </AppContext.Provider>
  );
};
