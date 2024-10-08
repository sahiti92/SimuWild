import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SpeciesInfo from "./Components/WatchList/SpeciesInfo";
import SpeciesDetails from "./Components/WatchList/SpeciesDetails"; // New species detail component
import Endangered from "./Components/WatchList/Endangered";
import Critically_Endangered from "./Components/WatchList/Critically_Endangered";
import Vulnerable from "./Components/WatchList/Vulnerable";
import NearThreatened from "./Components/WatchList/NearThreatened";
import Watchlist from "./Components/WatchList/Watchlist";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Watchlist />} />
        <Route path="/endangered" element={<Endangered />} />
        <Route
          path="/criticallyEndangered"
          element={<Critically_Endangered />}
        />
        <Route path="/vulnerable" element={<Vulnerable />} />
        <Route path="/nearThreatened" element={<NearThreatened />} />
        <Route path="/species/:scientificName" element={<SpeciesDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

{
  /* <header className="App-header"> */
}
{
  /* <h1>Indian Wildlife Watchlist</h1> */
}
// </header>
{
  /* <main> */
}
{
  /* <Watchlist /> Render the watchlist grid here */
}
// </main>
{
  /* <footer> */
}
{
  /* <p>© 2024 Indian Wildlife Preservation</p> */
}
// </footer>
