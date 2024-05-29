import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [transaction, setTransaction] = useState({});

  return (
    <DataContext.Provider value={{ transaction, setTransaction }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
