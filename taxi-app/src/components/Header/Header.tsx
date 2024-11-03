// src/components/CustomSlider.tsx
import React from "react";
import "./Header.css";

const CustomSlider: React.FC = () => {
  return (
    <div className="header-top">
      <p className="header-item">
        <img src="logo.png" alt="" width={30} height={30} />
        Taxi App
      </p>
      <div className="header-item search">
        <i className="fa-solid fa-magnifying-glass"></i>
        <span> Search</span>
      </div>
    </div>
  );
};

export default CustomSlider;
