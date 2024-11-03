// src/components/TripCard.tsx
import React from "react";
import "./TripCard.css";
import { DetailTrip } from "../../type/trip";

const TripCard: React.FC<DetailTrip> = ({
  vendor_id,
  trip_distance,
  total_amount,
}) => {
  return (
    <div className="trip-card">
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
