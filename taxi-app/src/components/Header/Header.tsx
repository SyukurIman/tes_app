// src/components/CustomSlider.tsx
import React, { useState } from "react";
import "./Header.css";

const CustomSlider: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const fetchData = async (query: string) => {
    try {
      console.log("Searching for:", query);
      
      // Tambahkan logika fetch di sini jika perlu
      // const response = await fetch(`your-api-endpoint?query=${query}`);
      // const data = await response.json();
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchData(query);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Mencegah refresh halaman
    fetchData(searchQuery);
  };

  return (
    <div className="header-top">
      <p className="header-item">
        <img src="logo.png" alt="" width={30} height={30} />
        Taxi App
      </p>
      <form className="header-item search" method="POST" onSubmit={handleFormSubmit}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default CustomSlider;
