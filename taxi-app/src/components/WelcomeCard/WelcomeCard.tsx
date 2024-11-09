// src/components/TripCard.tsx
import React from "react";
import "./WelcomeCard.css";
import { UserInfo } from "../../type/in";
import { useNavigate } from "react-router-dom";

const WelcomeCard: React.FC<UserInfo> = (props) => {
    const navigate = useNavigate();

  // Fungsi untuk menangani navigasi ke halaman lain dengan membawa data
  const handleButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;

    if (value === "login") {
      navigate("/account", { state: { action: "login" } });
    } else {
      navigate("/account", { state: { action: "register" } });
    }
  };
  return (
    <div className="welcome-card">
      {props.name ? (
        <div className="welcome-field">
            <p>Selamat Datang Kembali, 
                <span>{props.name}</span> !!</p>
        </div>
      
      ): (
        <>
        <div className="welcome-field">
            <p>Selamat Datang di Taxi App, <span><button onClick={handleButton} value="login">Login</button></span> or<span><button onClick={handleButton}>Register</button></span></p>
        </div></>
      )}
      
    </div>
  );
};

export default WelcomeCard;
