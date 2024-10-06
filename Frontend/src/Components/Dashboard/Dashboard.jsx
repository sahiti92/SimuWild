// src/components/Dashboard/Dashboard.jsx
import React from "react";
import DashboardHeader from "./DashboardHeader.jsx";
import DashboardFeatures from "./DashboardFeatures.jsx";
import DashboardFooter from "./DashboardFooter.jsx";

const Dashboard = () => {
  return (
    <div>
      <DashboardHeader />
      <main style={{ padding: "20px" }}>
        <img
          src="/wildlife.jpg"
          alt="Wildlife Dashboard"
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
        />
        <p
          style={{ textAlign: "center", margin: "20px 0", fontSize: "1.2rem" }}
        >
          Welcome to the Wildlife Conservation Dashboard. Explore the features
          below and join us in preserving wildlife!
        </p>
        <DashboardFeatures />
      </main>
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
