import { useEffect, useState } from "react";
import { DataTrip, MapTrip } from "../type/trip";
import axios from "axios";

export interface TripsContext {
  trips: DataTrip[];
  maps: MapTrip[];
}

const useTrips = () => {
  const [trips, setTrips] = useState<DataTrip[]>([]);
  const [mapData, setMapData] = useState<MapTrip[]>([]);

  useEffect(() => {
    // Fungsi untuk mengambil data pusat
    const fetchTrips = async () => {
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

    fetchTrips();
  }, []);

  useEffect(() => {
    // Fungsi untuk mengambil data peta berdasarkan trips yang sudah diambil
    const fetchMapData = async () => {
      if (trips.length > 0) {
        try {
          const url = import.meta.env.VITE_SERVER_URL;

          // Menggunakan Promise.all untuk mengambil data secara paralel
          const mapResults = await Promise.all(
            trips.map(async (trip) => {
              const response = await fetch(url + "/api/location", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer ",
                },
                body: JSON.stringify({
                  userLat: trip.pickup_latitude,
                  userLng: trip.pickup_longitude,
                  destLat: trip.dropoff_latitude,
                  destLng: trip.dropoff_longitude,
                  type: "driving-car",
                }),
              });

              const result = await response.json();
              return result.route; // Asumsikan `result.route` berisi data yang diinginkan
            })
          );

          setMapData(mapResults);
        } catch (error) {
          console.error("Error fetching map data:", error);
        }
      }
    };

    fetchMapData();
  }, [trips]);

  return { trips, mapData };
};

export default useTrips;
