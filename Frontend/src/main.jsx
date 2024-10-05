import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ScenarioHomePage from "./Components/ScenarioPlay/ScenarioHomePage.jsx";
//import './index.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScenarioHomePage />
  </StrictMode>
);
