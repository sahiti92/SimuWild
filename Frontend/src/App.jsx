// import React from 'react';
// import './App.css'; // Add global styles if needed
// //import Watchlist from './Components/Watchlist.jsx'; // Import the Watchlist component
// import Watchlist from './Components/WatchList/WatchList.jsx';
// import SpeciesInfo from './Components/WatchList/SpeciesInfo.jsx';
// function App() {
//   return (
//     <div className="App">
//     <SpeciesInfo/>
//     </div>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SpeciesInfo from "./Components/WatchList/SpeciesInfo";
import SpeciesDetails from "./Components/WatchList/SpeciesDetails"; // New species detail component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SpeciesInfo />} />
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
