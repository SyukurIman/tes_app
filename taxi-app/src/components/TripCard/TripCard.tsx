import React, { useEffect, useState } from "react";
import "./TripCard.css";
import { CoordinateMap, DetailTrip, MapTrip } from "../../type/trip";
import MapRoute from "./MapRoute";

interface TripCardProps extends DetailTrip, MapTrip {}

const TripCard: React.FC<TripCardProps & { isActive: boolean }> = (props) => {

  const [startCoor, setStartCoor] = useState<CoordinateMap>();
  const [endCoor, setEndCoor] = useState<CoordinateMap>();
  const [showDetails, setShowDetails] = useState(false);

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

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  useEffect(() => {
    if (!props.isActive) {
      setShowDetails(false);
    }
  }, [props.isActive]);

  return (
    <div className="trip-card" onClick={toggleDetails}>
      {props.coordinates && startCoor && endCoor && (
        <MapRoute
          startCoords={startCoor}
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

      {/* Toggle button to show/hide details */}
      <div className="toggle-details-button">
        <strong>{showDetails ? "Hide" : "Show"} Details</strong>
      </div>

      {/* Conditionally render additional trip details */}
      
      {showDetails && (
        <div className="details-layer">
          <div className="card-field">
            <strong>Pickup Date:</strong> {props.pickup_datetime}
          </div>
          <div className="card-field">
            <strong>Dropoff Date:</strong> {props.dropoff_datetime}
          </div>
          <div className="card-field">
            <strong>Rate Code:</strong> {props.rate_code}
          </div>
          <div className="card-field">
            <strong>Passenger Count:</strong> {props.passenger_count}
          </div>
          {/* Add more detailed fields as needed */}
        </div>
      )}
    </div>
  );
};

export default TripCard;
