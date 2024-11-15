import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScenarioHomePage from "./Components/ScenarioPlay/ScenarioHomePage.jsx";
import Scenario2 from "./Components/ScenarioPlay/Scenario2.jsx";
import Scenario1 from "./Components/ScenarioPlay/Scenario1.jsx";
import Scenario3 from "./Components/ScenarioPlay/Scenario3.jsx";
import Scenario4 from "./Components/ScenarioPlay/Scenario4.jsx";
import Scenario5 from "./Components/ScenarioPlay/Scenario5.jsx";
import Scenario6 from "./Components/ScenarioPlay/Scenario6.jsx";
import ElephantAnim12 from "./Components/ScenarioPlay/ScenesS1/outcome12.jsx";
//import LandingPage from "./Components/LandingPage.jsx";
import Slideshow from "./Components/LandingPage/slideshow.jsx";
import Login from "./Users/Login.jsx";
import SignUp from "./Users/Signup.jsx";
import Dashboard from "./Components/DashBoard2/Dashboard.jsx";
import AuthRoute from "./Components/AuthRoute.jsx";
import About from "./Components/DashBoard2/About.jsx";
import Contact from "./Components/DashBoard2/Contact.jsx";
import News from "./Components/DashBoard2/News.jsx";
import Watchlist from "./Components/WatchList/WatchList.jsx";
import Critically_Endangered from "./Components/WatchList/Critically_Endangered.jsx";
import Endangered from "./Components/WatchList/Endangered.jsx";
import Vulnerable from "./Components/WatchList/Vulnerable.jsx";
import NearThreatened from "./Components/WatchList/NearThreatened.jsx";
import SpeciesDetails from "./Components/WatchList/SpeciesDetails.jsx";
import Choice from "./Components/ScenarioPlay/ScenesS5/Startscene.jsx";
import ElephantAnim from "./Components/ScenarioPlay/ScenesS1/StartScene.jsx";
import ElephantAnim11 from "./Components/ScenarioPlay/ScenesS1/outcome11.jsx";
import ElephantAnim21 from "./Components/ScenarioPlay/ScenesS1/outcome21.jsx";
import ToChoose from "./Components/ScenarioPlay/ScenesS5/Tochoose.jsx";
import GLBModel from "./Components/ScenarioPlay/ScenesS5/outcome2.jsx";
import ToChoose1 from "./Components/ScenarioPlay/ScenesS1/Tochoose1.jsx";
import ToChoose2 from "./Components/ScenarioPlay/ScenesS1/Tochoose2.jsx";
import Choice2 from "./Components/ScenarioPlay/ScenesS5/outcome1.jsx";
import Outcome2 from "./Components/ScenarioPlay/ScenesS5/outcome2.jsx";
import WetlandScene from "./Components/ScenarioPlay/ScenesS3/StartScene.jsx";
import Slider from "./Components/ScenarioPlay/start.jsx";
import Community from "./Components/ScenarioPlay/ScenesS3/outcome1.jsx";
import SummaryPage from "./Components/ScenarioPlay/ScenesS3/Summary.jsx";
import Choose from "./Components/ScenarioPlay/ScenesS3/Choice.jsx";
import LeopardScene from "./Components/ScenarioPlay/ScenesS2/StartScene.jsx";
import ToCh3 from "./Components/ScenarioPlay/ScenesS2/Toch3.jsx";
import Leapord_o2 from "./Components/ScenarioPlay/ScenesS2/outcome2.jsx";
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
        <Route path="/scenarios/scenario2" element={<Scenario2 />} />
        <Route path="/scenarios/scenario3" element={<Scenario3 />} />
        <Route path="/scenarios/scenario4" element={<Scenario4 />} />
        <Route path="/scenarios/scenario5" element={<Scenario5 />} />
        <Route path="/scenarios/scenario6" element={<Scenario6 />} />
        <Route
          path="/startS3"
          element={<Slider backgroundImage={"./rhinobg.png"} />}
        />

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
          path="/contact"
          element={
            <AuthRoute>
              <Contact />
            </AuthRoute>
          }
        />
        <Route
          path="/news"
          element={
            <AuthRoute>
              <News />
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
        <Route path="/eleph" element={<ElephantAnim />} />
        <Route path="/eleph11" element={<ElephantAnim11 />} />
        <Route path="/eleph12" element={<ElephantAnim12 />} />
        <Route path="/eleph21" element={<ElephantAnim21 />} />
        <Route path="/threeScene" element={<Choice />} />
        <Route path="/outcome1s5" element={<Choice2 />} />
        <Route path="/toChoose" element={<ToChoose />} />
        <Route path="/toChoose1" element={<ToChoose1 />} />
        <Route path="/toChoose2" element={<ToChoose2 />} />
        <Route path="/outcome2s5" element={<Outcome2 />} />
        <Route path="/model" element={<GLBModel url="./elephant1.glb" />} />
        <Route path="/outcome1S3" element={<WetlandScene />} />
        <Route path="/outcome2S3" element={<Community />} />
        <Route path="/sum3" element={<SummaryPage />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/leopard" element={<LeopardScene />} />
        <Route path="/leapordtochoose" element={<ToCh3 />} />
        <Route path="/leapordo2" element={<Leapord_o2 />} />
      </Routes>
    </Router>
  );
};

export default App;
