import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [username, setUsername] = useState("");

  const addGoal = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  return (
    <AppContext.Provider value={{ goals, addGoal, username, setUsername }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
