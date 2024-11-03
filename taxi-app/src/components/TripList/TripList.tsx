// src/components/TripList.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import TripCard from "../TripCard/TripCard";
import { DataTrip } from "../../type/trip";

import Maps from "../map/Maps";

const TripList = () => {
  let [trips, setTrips] = useState<DataTrip[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://data.cityofnewyork.us/resource/gkne-dk5s.json",
          {
            headers: {
              Accept: "application/json",
              "X-App-Token": "KOVzLN9F73NQyzeS3ofY7h7ZA",
            },
            params: {
              $limit: 5,
            },
          }
        );
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {trips.map((trip, index) => (
        <TripCard
          key={index}
          vendor_id={String(trip.vendor_id)} // Map vendor_id to vendorId
          trip_distance={Number(trip.trip_distance)} // Map trip_distance to tripDistance
          total_amount={Number(trip.total_amount)} // Map total_amount to totalAmount
        />
      ))}

      <Maps></Maps>
    </div>
  );
};

export default TripList;
