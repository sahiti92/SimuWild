import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import ScenarioHomePage from "./Components/ScenarioPlay/ScenarioHomePage.jsx";
import Scenario2 from "./Components/ScenarioPlay/Scenario2.jsx";
import Scenario1 from "./Components/ScenarioPlay/Scenario1.jsx";
import Scenario3 from "./Components/ScenarioPlay/Scenario3.jsx";
import Scenario4 from "./Components/ScenarioPlay/Scenario4.jsx";
import Scenario5 from "./Components/ScenarioPlay/Scenario5.jsx";
import Scenario6 from "./Components/ScenarioPlay/Scenario6.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Define the route for the home page */}
        <Route path="/" element={<ScenarioHomePage />} />
        {/* Define the route for Scenario2 page */}
        <Route path="/scenario2" element={<Scenario2 />} />
        <Route path="/scenario1" element={<Scenario1 />} />
        <Route path="/scenario3" element={<Scenario3 />} />
        <Route path="/scenario4" element={<Scenario4 />} />
        <Route path="/scenario5" element={<Scenario5 />} />
        <Route path="/scenario6" element={<Scenario6 />} />
      </Routes>
    </Router>
  </StrictMode>
);

// import App from "./App.jsx";
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { store } from "./redux/store/store.js";
// import { Provider } from "react-redux";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import "./index.css";

// const client = new QueryClient();

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <QueryClientProvider client={client}>
//         <App />
//         <ReactQueryDevtools initialIsOpen={false} />
//       </QueryClientProvider>
//     </Provider>
//   </React.StrictMode>
// );
