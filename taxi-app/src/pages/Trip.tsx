// src/pages/Trip.tsx
import React, { useEffect, useState } from "react";
import CustomSlider from "../components/CustomSlidder/CustomSlider";
import TripList from "../components/TripList/TripList";
import useUserProfile from "../hooks/useUserProfile";
import { DataTrip, MapTrip } from "../type/trip";
import { UserInfo } from "../type/in";
import { useOutletContext } from "react-router-dom";

interface ContextData {
  trips: DataTrip[];
  mapData: MapTrip[];
  user: UserInfo | null;
}

const Trip: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  // const { user } = useUserProfile();

  const dataGlobal = useOutletContext<ContextData>();
  const [loading, setLoading] = useState(true);

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

    if (images && dataGlobal.user) {
      console.log(dataGlobal.user);
      setLoading(false);
    }

    if (!dataGlobal.user) {
    }

    fetchImages();
  }, []);

  return (
    <div className="content mt-3">
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
