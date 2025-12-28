import React from "react";
import { useNavigate } from "react-router-dom";
import "./GoogleLogin.css";
import { useEffect } from "react";

function GoogleLogin() {
  const navigate = useNavigate();
   // HANDLE REDIRECT FROM BACKEND
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("token", token);
    window.history.replaceState({}, document.title, "/");

    navigate("/thread");
  }
}, []);

  // const handleGoogleLogin = () => {
  //   // Redirect browser to backend
  //   window.location.href =
  //     "https://mysmartgpt.onrender.com/api/auth/google";
  // };
  const handleGoogleLogin = () => {
  window.location.href = "https://mysmartgpt.onrender.com/api/auth/google";
};

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="title">SmartGPT</h1>
        <p className="subtitle">
          Sign in to continue with your AI workspace
        </p>

        <button className="google-btn" onClick={handleGoogleLogin}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
          />
          Continue with Google
        </button>

        <p className="footer-text">
          Secure authentication powered by Google
        </p>
      </div>
    </div>
  );
}

export default GoogleLogin;


