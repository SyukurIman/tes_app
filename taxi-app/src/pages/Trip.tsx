// src/pages/Trip.tsx
import React, { useEffect, useState } from "react";
import CustomSlider from "../components/CustomSlidder/CustomSlider";
import TripList from "../components/TripList/TripList";

const Trip: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Fetch images from API
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://random-image-pepebigotes.vercel.app/lists/example-images-list.json"
        ); // Replace with your API endpoint
        const data = await response.json();
        setImages(data.images); // Assuming API response format is { images: ["url1", "url2", ...] }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="content">
      {images.length > 0 ? (
        <CustomSlider images={images} />
      ) : (
        <p>Loading images...</p>
      )}

      <TripList />
    </div>
  );
};

export default Trip;
