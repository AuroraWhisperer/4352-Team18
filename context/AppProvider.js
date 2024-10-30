import React from "react";
import { AuthProvider } from "./AuthContext";
import { MainProvider } from "./MainContext";

export const AppProvider = ({ children }) => (
  <AuthProvider>
    <MainProvider>{children}</MainProvider>
  </AuthProvider>
);
