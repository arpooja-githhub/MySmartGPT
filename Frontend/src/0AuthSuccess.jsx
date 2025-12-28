import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "./MyContext.jsx";

function OAuthSuccess() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(MyContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true); 

      window.history.replaceState({}, document.title, "/thread");
      navigate("/thread"); // navigate to chat
    } else {
      navigate("/login");
    }
  }, [navigate, setIsAuthenticated]);

  return <p>Logging you in...</p>;
}

export default OAuthSuccess;
