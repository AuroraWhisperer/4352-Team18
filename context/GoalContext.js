import React, { createContext, useContext, useState } from "react";

export const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  const addGoal = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  return (
    <GoalContext.Provider value={{ goals, addGoal }}>
      {children}
    </GoalContext.Provider>
  );
};

export const useGoals = () => useContext(GoalContext);
