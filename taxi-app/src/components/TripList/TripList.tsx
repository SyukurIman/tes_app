// src/components/TripList.tsx
import { useEffect, useRef, useState } from "react";

import TripCard from "../TripCard/TripCard";
import { DataTrip, MapTrip } from "../../type/trip";

import "./TripList.css";
import { useOutletContext } from "react-router-dom";

interface ContextData {
  trips: DataTrip[];
  mapData: MapTrip[];
}

const TripList: React.FC = () => {
  const { trips, mapData } = useOutletContext<ContextData>();

  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<"left" | "right">(
    "right"
  );

  const [WidthNow, setWidthNow] = useState<number>(
    sliderRef.current?.offsetWidth || 0
  );

  const [lenWidth, setLenWidth] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        setWidthNow(sliderRef.current?.offsetWidth);
        if (scrollDirection === "right") {
          sliderRef.current.scrollBy({
            left: WidthNow,
            behavior: "smooth",
          });

          setLenWidth(WidthNow + lenWidth);
          if (lenWidth >= WidthNow * 5) {
            setScrollDirection("left");
          }
        } else {
          sliderRef.current.scrollBy({
            left: -WidthNow,
            behavior: "smooth",
          });

          setLenWidth(WidthNow - lenWidth);
          if (lenWidth <= 0) {
            setScrollDirection("right");
          }
        }
      }
    }, 10000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [scrollDirection, WidthNow, lenWidth]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      setWidthNow(sliderRef.current?.offsetWidth);
      if (lenWidth > 0 && lenWidth >= WidthNow) {
        setLenWidth(lenWidth - WidthNow);
      }
      sliderRef.current.scrollBy({ left: -WidthNow, behavior: "smooth" });
    }
  };

  // Fungsi untuk menggulir slider ke kanan
  const scrollRight = () => {
    if (sliderRef.current) {
      setWidthNow(sliderRef.current?.offsetWidth);
      if (lenWidth >= 0 && lenWidth <= WidthNow * 5) {
        setLenWidth(lenWidth + WidthNow);
      }
      sliderRef.current.scrollBy({ left: WidthNow, behavior: "smooth" });
    }
  };

  return (
    <div className="listContainer">
      <div className="listHeader">
        <h2>Best Trip</h2>
        <button>
          <i className="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>
      <hr className="mb-3" />
      {trips.length > 0 && mapData.length > 0 ? (
        <>
          <div className="slider" ref={sliderRef}>
            <div className="slider-inner">
              {trips.map((trip, index) => (
                <div className="slide" key={index}>
                  <TripCard
                    key={index}
                    vendor_id={String(trip.vendor_id)}
                    trip_distance={Number(trip.trip_distance)}
                    total_amount={Number(trip.total_amount)}
                    pickup_longitude={Number(trip.pickup_longitude)}
                    pickup_latitude={Number(trip.pickup_latitude)}
                    dropoff_longitude={Number(trip.dropoff_longitude)}
                    dropoff_latitude={Number(trip.dropoff_latitude)}
                    distance={mapData[index].distance}
                    duration={mapData[index].duration}
                    coordinates={mapData[index].coordinates}
                    steps={[]}
                  />
                </div>
              ))}
            </div>
          </div>

          <hr className="my-2 mx-0" />
          <div className="listHeader button_map">
            {lenWidth > 0 && (
              <div className="left-btn">
                <button className="navigation-buttons " onClick={scrollLeft}>
                  <i className="fa-solid fa-caret-left"></i>
                  <span>Previus</span>
                </button>
              </div>
            )}
            {lenWidth <= WidthNow * 5 && (
              <div className="right-btn">
                <button className="navigation-buttons" onClick={scrollRight}>
                  <span>Next</span>
                  <i className="fa-solid fa-caret-right"></i>
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TripList;
