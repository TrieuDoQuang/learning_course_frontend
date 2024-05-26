import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [userContext, setUserContext] = useState(
    JSON.parse(localStorage.getItem("userContext")) || null
  );

  useEffect(() => {
    localStorage.setItem("userContext", JSON.stringify(userContext));
  }, [userContext]);

  return (
    <DataContext.Provider
      value={{
        userContext,
        setUserContext,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
