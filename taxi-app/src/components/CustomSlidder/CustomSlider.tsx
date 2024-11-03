// src/components/CustomSlider.tsx
import React, { useState, useEffect } from "react";
import "./CustomSlider.css";

interface CustomSliderProps {
  images: string[];
}

const CustomSlider: React.FC<CustomSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider-container">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="slider-image"
      />

      <h3 className="slider-title">Let's travel to the dream place</h3>
      <div className="slidder-sub">
        <div className="slidder-button">Beach</div>
        <div className="slidder-button">Mountains</div>
        <div className="slidder-button">Forest</div>
      </div>
    </div>
  );
};

export default CustomSlider;
