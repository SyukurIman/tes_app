// src/components/TripCard.tsx
import React, { useEffect, useState } from "react";
import "./TripCard.css";
import { CoordinateMap, DetailTrip, MapTrip } from "../../type/trip";
// import axios from "axios";
import MapRoute from "./MapRoute";

const TripCard: React.FC<DetailTrip> = ({
  vendor_id,
  trip_distance,
  total_amount,
}) => {

  let [Map, setMap] = useState<MapTrip>();
  
  let [startCoor, setStartCoor] = useState<CoordinateMap>();
  let [endCoor, setEndCoor] = useState<CoordinateMap>();

  useEffect(() => {
    setStartCoor({
      langtitude: -7.3571367,
      longtitude: 112.7509655
    })
  
    setEndCoor({
      langtitude: -7.352349,
      longtitude: 112.760286
    })
  }, [trip_distance, total_amount])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://8p24tl4n-3000.asse.devtunnels.ms/api/user/location",
          {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU3YzRhYWFlLTBiZGUtNGViYS1hMjZhLTcxOTJlOTZmODdkZiIsImlhdCI6MTczMDg4NDQ4MywiZXhwIjoxNzMwODg4MDgzLCJzdWIiOiJhcHAifQ.lc1FVHNHIkGullUAYSBmyNHbBEHREEJqA8XPTQTOKSs",
            },
            body: JSON.stringify({
              userLat : "-7.3571367", 
              userLng : "112.7509655", 
              destLat : "-7.352349", 
              destLng : "112.760286",
              type: "driving-car" }),
          }
        );
        const result = await response.json();
        setMap(result.route);
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="trip-card">
      {Map && startCoor && endCoor && (
        <MapRoute
          startCoords={startCoor} // Example coordinates
          endCoords={endCoor}
          routeData={Map}
        />
      )}
      <div className="card-field">
        <strong>Vendor ID:</strong> {vendor_id}
      </div>
      <div className="card-field">
        <strong>Distance:</strong> {trip_distance.toFixed(2)} miles
      </div>
      <div className="card-field">
        <strong>Total Amount:</strong> ${total_amount.toFixed(2)}
      </div>
    </div>
  );
};

export default TripCard;
