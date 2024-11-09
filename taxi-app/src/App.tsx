// src/App.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import BottomNavBar from "./components/BottomNavbar/BottomNavBar";
import "./App.css";

import useUserProfile from "./hooks/useUserProfile";
import useTrips from "./hooks/useTrips";

const App: React.FC = () => {
  const { user } = useUserProfile();
  const { trips, mapData } = useTrips();
  const contextData = { user, trips, mapData };

  return (
    <div className="app-container">
      <Outlet context={contextData} />
      <Header />
      <Toaster />
      <BottomNavBar />
    </div>
  );
};

export default App;
