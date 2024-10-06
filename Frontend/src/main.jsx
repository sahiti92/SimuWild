import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import App from './App.jsx'
import Scenario2 from "./Components/ScenarioPlay/Scenario2.jsx";
import './index.css'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Scenario2/>
  </StrictMode>,
);
