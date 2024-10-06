import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
//import "./index.css";
import Dashboard2 from "./Components/DashBoard2/Dashboard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Dashboard2 />
  </StrictMode>
);
