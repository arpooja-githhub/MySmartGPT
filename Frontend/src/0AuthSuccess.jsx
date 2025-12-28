// src/pages/OAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // remove token from URL
      window.history.replaceState({}, document.title, "/");

      navigate("/thread");
    } else {
      navigate("/login");
    }
  }, []);

  return <p>Logging you in...</p>;
}

export default OAuthSuccess;
