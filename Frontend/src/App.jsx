import React from 'react';
import './App.css'; // Add global styles if needed
//import Watchlist from './Components/Watchlist.jsx'; // Import the Watchlist component
import Watchlist from './Components/WatchList/WatchList.jsx';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Indian Wildlife Watchlist</h1>
      </header>
      <main>
        <Watchlist /> {/* Render the watchlist grid here */}
      </main>
      <footer>
        <p>© 2024 Indian Wildlife Preservation</p>
      </footer>
    </div>
  );
}

export default App;

