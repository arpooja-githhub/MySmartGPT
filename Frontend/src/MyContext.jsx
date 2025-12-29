// import { createContext } from "react";
// export const MyContext = createContext("");

import { createContext, useState } from "react";

export const MyContext = createContext(null);

export function MyProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <MyContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </MyContext.Provider>
  );
}
