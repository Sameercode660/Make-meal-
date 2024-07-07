import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserAuthenticationProvider } from "./contexts/Authentication.context.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/app.routers.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserAuthenticationProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserAuthenticationProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
