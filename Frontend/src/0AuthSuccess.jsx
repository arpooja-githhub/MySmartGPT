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

    navigate("/thread", { replace: true }); // navigate to main app
  } else {
    navigate("/login", { replace: true });
  }
}, [navigate, setIsAuthenticated]);


  return <p>Logging you in...</p>;
}

export default OAuthSuccess;
