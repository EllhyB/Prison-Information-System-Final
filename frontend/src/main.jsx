import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router/Router";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./contacts/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  </React.StrictMode>,
);
