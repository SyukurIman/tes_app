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
  const [scrollDirection, setScrollDirection] = useState<"left" | "right">("right");
  const [WidthNow, setWidthNow] = useState(0);
  const [lenWidth, setLenWidth] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTrips, setFilteredTrips] = useState<DataTrip[]>(trips);
  const [filteredMapData, setFilteredMapData] = useState<MapTrip[]>(mapData);

  const [autoScroll, setAutoScroll] = useState<number | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // Track active slide index

  // Filter trips based on query
  useEffect(() => {
    const filteredIndices = trips
      .map((trip, index) => {
        if (
          String(trip.vendor_id).toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(trip.trip_distance).includes(searchQuery) ||
          String(trip.total_amount).includes(searchQuery)
        ) {
          return index;
        }
        return -1;
      })
      .filter((index) => index !== -1);

    setFilteredTrips(filteredIndices.map((index) => trips[index]));
    setFilteredMapData(filteredIndices.map((index) => mapData[index]));
  }, [searchQuery, trips, mapData]);

  // Automatic scroll logic
  const startAutoScroll = () => {
    if (autoScroll) clearInterval(autoScroll);

    const intervalId = window.setInterval(() => {
      if (sliderRef.current) {
        setWidthNow(sliderRef.current.offsetWidth);
        if (scrollDirection === "right") {
          sliderRef.current.scrollBy({ left: WidthNow, behavior: "smooth" });
          setLenWidth((prev) => prev + WidthNow);
          setActiveSlideIndex((prev) => Math.min(prev + 1, filteredTrips.length - 1)); // Update active slide index

          if (lenWidth >= WidthNow * (filteredTrips.length - 1)) {
            setScrollDirection("left");
          }
        } else {
          sliderRef.current.scrollBy({ left: -WidthNow, behavior: "smooth" });
          setLenWidth((prev) => prev - WidthNow);
          setActiveSlideIndex((prev) => Math.max(prev - 1, 0)); // Update active slide index

          if (lenWidth <= 0) {
            setScrollDirection("right");
          }
        }
      }
    }, 10000); // Change slide every 10 seconds

    setAutoScroll(intervalId);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScroll) clearInterval(autoScroll);
    };
  }, [scrollDirection, WidthNow, lenWidth, filteredTrips]);

  // Manual scrolling
  const handleManualScroll = () => {
    if (autoScroll) clearInterval(autoScroll);
    startAutoScroll();
  };

  const scrollLeft = () => {
    handleManualScroll();
    if (sliderRef.current) {
      setWidthNow(sliderRef.current.offsetWidth);
      if (lenWidth > 0) {
        setLenWidth((prev) => prev - WidthNow);
        setActiveSlideIndex((prev) => Math.max(prev - 1, 0)); // Update active slide index
      }
      sliderRef.current.scrollBy({ left: -WidthNow, behavior: "smooth" });
      if (lenWidth <= 0) {
        setScrollDirection("right");
      }
    }
  };

  const scrollRight = () => {
    handleManualScroll();
    if (sliderRef.current) {
      setWidthNow(sliderRef.current.offsetWidth);
      if (lenWidth < WidthNow * (filteredTrips.length - 1)) {
        setLenWidth((prev) => prev + WidthNow);
        setActiveSlideIndex((prev) => Math.min(prev + 1, filteredTrips.length - 1)); // Update active slide index
      }
      sliderRef.current.scrollBy({ left: WidthNow, behavior: "smooth" });
      if (lenWidth >= WidthNow * (filteredTrips.length - 1)) {
        setScrollDirection("left");
      }
    }
  };

  return (
    <div className="listContainer">
      <div className="listHeader">
        <h2>Best Trip</h2>
        <input
          type="text"
          placeholder="Search by vendor, distance, or amount"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <hr className="mb-3" />

      {filteredTrips.length > 0 && filteredMapData.length > 0 ? (
        <>
          <div className="slider" ref={sliderRef}>
            <div className="slider-inner">
              {filteredTrips.map((trip, index) => (
                <div className="slide" key={index}>
                  <TripCard
                    vendor_id={String(trip.vendor_id)}
                    trip_distance={Number(trip.trip_distance)}
                    total_amount={Number(trip.total_amount)}
                    pickup_longitude={Number(trip.pickup_longitude)}
                    pickup_latitude={Number(trip.pickup_latitude)}
                    dropoff_longitude={Number(trip.dropoff_longitude)}
                    dropoff_latitude={Number(trip.dropoff_latitude)}
                    distance={filteredMapData[index]?.distance}
                    duration={filteredMapData[index]?.duration}
                    coordinates={filteredMapData[index]?.coordinates}
                    steps={[]}
                    pickup_datetime={trip.pickup_datetime}
                    dropoff_datetime={trip.dropoff_datetime}
                    rate_code={trip.rate_code}
                    passenger_count={Number(trip.passenger_count)}
                    isActive={index === activeSlideIndex} // Pass active status to TripCard
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="listHeader button_map mt-2">
            {lenWidth > 0 && (
              <button className="navigation-buttons left-btn" onClick={scrollLeft}>
                <i className="fa-solid fa-caret-left"></i>
                Previous
              </button>
            )}

            {lenWidth < WidthNow * (filteredTrips.length - 1) && (
              <button className="navigation-buttons right-btn" onClick={scrollRight}>
                Next
                <i className="fa-solid fa-caret-right"></i>
              </button>
            )}
          </div>
        </>
      ) : (
        <p>No trips found</p>
      )}
    </div>
  );
};

export default TripList;
