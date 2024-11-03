// src/components/BottomNavBar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./BottomNavBar.css";

const BottomNavBar: React.FC = () => {
  return (
    <nav className="bottom-nav bg-white border-gray-200 dark:bg-gray-900">
      <NavLink to="/trip" className="nav-item " activeClassName="active">
        <span role="img" aria-label="trip">
          <i className="fa-solid fa-suitcase-rolling"></i>
        </span>
        <p>Trip</p>
      </NavLink>
      <NavLink to="/history" className="nav-item" activeClassName="active">
        <span role="img" aria-label="history">
          <i className="fa-solid fa-clock-rotate-left"></i>
        </span>
        <p>History</p>
      </NavLink>
      <NavLink to="/account" className="nav-item" activeClassName="active">
        <span role="img" aria-label="account">
          <i className="fa-solid fa-users-gear"></i>
        </span>
        <p>Account</p>
      </NavLink>
    </nav>
  );
};

export default BottomNavBar;
