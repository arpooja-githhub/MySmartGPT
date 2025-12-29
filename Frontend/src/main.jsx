import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { MyContext } from "./MyContext.jsx";

function AppWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <MyContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MyContext.Provider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
