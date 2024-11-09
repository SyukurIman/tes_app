// src/pages/Trip.tsx
import React, { useEffect, useState } from "react";
import CustomSlider from "../components/CustomSlidder/CustomSlider";
import TripList from "../components/TripList/TripList";
import useUserProfile from "../hooks/useUserProfile";
import { DataTrip, MapTrip } from "../type/trip";
import { UserInfo } from "../type/in";
import { useOutletContext } from "react-router-dom";
import WelcomeCard from "../components/WelcomeCard/WelcomeCard";

interface ContextData {
  trips: DataTrip[];
  mapData: MapTrip[];
  user: UserInfo | null;
}

const Trip: React.FC = () => {
  const dataUser = useUserProfile()
  const [images, setImages] = useState<string[]>([]);
  const dataGlobal = useOutletContext<ContextData>();
  const [user, setUser] = useState<UserInfo | null>()
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://random-image-pepebigotes.vercel.app/lists/example-images-list.json"
        ); 
        const data = await response.json();
        setImages(data.images); 
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (dataGlobal?.mapData?.length > 0) {
      setUser(dataGlobal.user ?? dataUser.user);
    }
  }, [dataGlobal, dataUser]);
  

  return (
    <div className="content mt-3">
      {images.length > 0 ? (
        <CustomSlider images={images} />
      ) : (
        <p>Loading images...</p>
      )}

      {
        dataGlobal.mapData.length > 0 && (
          <WelcomeCard token={""} name={user?.name} email={""} photoUrl={""}>
          </WelcomeCard>      
        )
      }
      <TripList />
    </div>
  );
};

export default Trip;
