// src/components/TripCard.tsx
import React, { useEffect, useState } from "react";
import "./TripCard.css";
import { CoordinateMap, DetailTrip, MapTrip } from "../../type/trip";
import MapRoute from "./MapRoute";

interface TripCardProps extends DetailTrip, MapTrip {}

const TripCard: React.FC<TripCardProps> = (props) => {
  const [startCoor, setStartCoor] = useState<CoordinateMap>();
  const [endCoor, setEndCoor] = useState<CoordinateMap>();

  useEffect(() => {
    setStartCoor({
      langtitude: props.pickup_latitude,
      longtitude: props.pickup_longitude,
    });

    setEndCoor({
      langtitude: props.dropoff_latitude,
      longtitude: props.dropoff_longitude,
    });
  }, [props]);

  return (
    <div className="trip-card">
      {props.coordinates && startCoor && endCoor && (
        <MapRoute
          startCoords={startCoor} // Example coordinates
          endCoords={endCoor}
          routeData={props}
        />
      )}
      <div className="card-field">
        <strong>Vendor ID:</strong> {props.vendor_id}
      </div>
      <div className="card-field">
        <strong>Distance:</strong> {props.trip_distance.toFixed(2)} miles
      </div>
      <div className="card-field">
        <strong>Total Amount:</strong> ${props.total_amount.toFixed(2)}
      </div>
    </div>
  );
};

export default TripCard;
