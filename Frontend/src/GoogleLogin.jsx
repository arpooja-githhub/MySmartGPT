import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";
import { useNavigate } from "react-router-dom";
import "./GoogleLogin.css";

function GoogleLogin() {
  const navigate = useNavigate();
  const responsGoogle = async (authResult) => {
  try {
    if (authResult?.code) {
      const result = await googleAuth(authResult.code);

      const { email, name, image } = result.data.user;
      const token = result.data.token;

      // store user info
      localStorage.setItem(
        "user-info",
        JSON.stringify({ email, name, image, token })
      );

      // redirect to chat
      navigate("/thread");
    }
  } catch (err) {
    console.error("Google Login Error:", err);
  }
};

  const googleLogin = useGoogleLogin({
    onSuccess: responsGoogle,
    onError: responsGoogle,
    flow: "auth-code",
  });

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="title">SmartGPT</h1>
        <p className="subtitle">
          Sign in to continue with your AI workspace
        </p>

        <button className="google-btn" onClick={googleLogin}>
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


