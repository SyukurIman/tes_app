// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Trip from "./pages/Trip";
import History from "./pages/History";
import Account from "./pages/Account";
import Header from "./components/Header/Header";
import BottomNavBar from "./components/BottomNavbar/BottomNavBar";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/trip" element={<Trip />} />
          <Route path="/history" element={<History />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<Trip />} /> {/* Default to Trip */}
        </Routes>
        <Header />
        <BottomNavBar />
      </div>
    </Router>
  );
};

export default App;
