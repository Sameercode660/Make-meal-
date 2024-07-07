import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function GoogleAuth() {
  const navigate = useNavigate();

  const handleGoogleLogin = async (response) => {
    const token = response.credential;
    try {
      const userInfo = await axios.post(
        "http://localhost:8080/user/auth/google",
        {
          token,
        }
      );

      console.log(userInfo);

      localStorage.setItem("email", userInfo.data.email);
      localStorage.setItem("name", userInfo.data.name);

      navigate("/register-details");
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  return (
    <div>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={(error) => {
            console.log(error);
          }}
        ></GoogleLogin>
      </GoogleOAuthProvider>
    </div>
  );
}

export default React.memo(GoogleAuth);
