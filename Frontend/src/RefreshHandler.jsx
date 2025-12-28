import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("user-info");
    const user = stored ? JSON.parse(stored) : null;
    const token = user?.token;

    if (token) {
      setIsAuthenticated(true);

      if (location.pathname === "/" || location.pathname === "/login") {
        navigate("/thread", { replace: true });
      }
    } else {
      setIsAuthenticated(false);

      if (location.pathname === "/thread") {
        navigate("/login", { replace: true });
      }
    }
  }, [location.pathname, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;
