import React from "react";

const Dashboard = ({ isLoggedIn, totalIncidents }) => {
  return (
    <div>
      <h1>Welcome to the Safety and Incident Reporting App</h1>
      <p>
        This app allows construction workers to report safety incidents,
        accidents, and near-misses. 
      </p>
      {isLoggedIn && (
        <>
          <h2>Dashboard Summary</h2>
          <p>Total Incidents: {totalIncidents}</p>
        </>
      )}
    </div>
  );
};

export default Dashboard;
