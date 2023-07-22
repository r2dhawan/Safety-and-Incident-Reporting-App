import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import IncidentForm from "./components/IncidentForm";
import IncidentList from "./components/IncidentList";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [incidents, setIncidents] = useState([]);

  const handleAddIncident = (newIncident) => {
    // Add the new incident to the incidents array
    setIncidents([...incidents, newIncident]);
  };

  return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link to="/incident-list">Incident List</Link>
                  </li>
                  <li>
                    <Link to="/incident-form">Report Incident</Link>
                  </li>
                  <li>
                    <button onClick={() => setIsLoggedIn(false)}>Logout</button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  isLoggedIn={isLoggedIn}
                  totalIncidents={incidents.length}
                />
              } 
            />
            {isLoggedIn ? (
              <>
                <Route
                  path="/incident-list"
                  element={<IncidentList incidents={incidents} />} // Pass the incidents array to the IncidentList component
                />
                <Route
                  path="/incident-form"
                  element={<IncidentForm onAddIncident={handleAddIncident} />}
                />
              </>
            ) : (
              <Route
                path="/login"
                element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} // Pass the setIsLoggedIn function to the LoginPage component
              />
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
