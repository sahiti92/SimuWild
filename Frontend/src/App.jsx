import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScenarioHomePage from "./Components/ScenarioPlay/ScenarioHomePage.jsx";
import Scenario2 from "./Components/ScenarioPlay/Scenario2.jsx";
import Scenario1 from "./Components/ScenarioPlay/Scenario1.jsx";
import Scenario3 from "./Components/ScenarioPlay/Scenario3.jsx";
import Scenario4 from "./Components/ScenarioPlay/Scenario4.jsx";
import Scenario5 from "./Components/ScenarioPlay/Scenario5.jsx";
import Scenario6 from "./Components/ScenarioPlay/Scenario6.jsx";
import ElephantAnim from "./Components/ScenarioPlay/ElephantAnim.jsx";
//import LandingPage from "./Components/LandingPage.jsx";
import Slideshow from "./Components/LandingPage/slideshow.jsx";
import Login from "./Users/Login.jsx";
import SignUp from "./Users/SignUp.jsx";
import Dashboard from "./Components/Dashboard2/Dashboard.jsx";
import AuthRoute from "./Components/AuthRoute.jsx";
import About from "./Components/DashBoard2/About.jsx";
import Watchlist from "./Components/WatchList/WatchList.jsx";
import Critically_Endangered from "./Components/WatchList/Critically_Endangered.jsx";
import Endangered from "./Components/WatchList/Endangered.jsx";
import Vulnerable from "./Components/WatchList/Vulnerable.jsx";
import NearThreatened from "./Components/WatchList/NearThreatened.jsx";
import SpeciesDetails from "./Components/WatchList/SpeciesDetails.jsx";
import ThreeScene from "./Components/ScenarioPlay/ScenesS5/Startscene.jsx";
import ElephantAnim1 from "./Components/ScenarioPlay/ScenesS1/StartScene.jsx";
import ToChoose from "./Components/ScenarioPlay/ScenesS5/Tochoose.jsx";
//import UpdatePassword from "./Users/UpdatePassword.jsx";
//import UserProfile from "./Users/UserProfile.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define route for Landing Page */}
        <Route path="/" element={<Slideshow />} />

        {/* Authentication-related routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Scenario Routes */}
        <Route path="/scenarios" element={<ScenarioHomePage />} />
        <Route path="/scenarios/scenario1" element={<Scenario1 />} />
        <Route path="/anim" element={<ElephantAnim />} />
        <Route path="/scenarios/scenario2" element={<Scenario2 />} />
        <Route path="/scenarios/scenario3" element={<Scenario3 />} />
        <Route path="/scenarios/scenario4" element={<Scenario4 />} />
        <Route path="/scenarios/scenario5" element={<Scenario5 />} />
        <Route path="/scenarios/scenario6" element={<Scenario6 />} />
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
      
              <Dashboard />
              </AuthRoute>
        
          }
        />
        <Route
          path="/about"
          element={
            <AuthRoute>
              <About />
            </AuthRoute>
          }
        />
        <Route
          path="/watchlist"
          element={
            <AuthRoute>
              <Watchlist />
            </AuthRoute>
          }
        />
        <Route
          path="/criticallyEndangered"
          element={<Critically_Endangered />}
        />
        <Route path="/endangered" element={<Endangered />} />
        <Route path="/vulnerable" element={<Vulnerable />} />
        <Route path="/nearThreatened" element={<NearThreatened />} />
        <Route path="/species/:scientificName" element={<SpeciesDetails />} />
        <Route path="/eleph" element={<ElephantAnim1 />} />
        <Route path="/threeScene" element={<ThreeScene />} />
        <Route path="/toChoose" element={<ToChoose />} />
      </Routes>
    </Router>
  );
};

export default App;
