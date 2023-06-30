import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { MyContextProvider } from "../context/AuthContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
    <MyContextProvider>
      <App />
    </MyContextProvider>
);
