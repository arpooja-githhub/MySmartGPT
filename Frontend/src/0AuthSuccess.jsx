import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";

function OAuthSuccess() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(MyContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);

      // clean URL
      window.history.replaceState({}, document.title, "/thread");

      navigate("/thread", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  return <p>Logging you in...</p>;
}

export default OAuthSuccess;
