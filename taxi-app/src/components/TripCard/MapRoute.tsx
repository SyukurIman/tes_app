import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapGenerate } from "../../type/trip";

const MapRoute: React.FC<MapGenerate> = ({
  startCoords,
  endCoords,
  routeData,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(
        [startCoords.langtitude, startCoords.longtitude],
        13
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) return;
      mapRef.current?.removeLayer(layer);
    });

    // Draw the route using coordinates
    if (routeData.coordinates) {
      const latLngs = routeData.coordinates.map(
        ([lng, lat]) => [lat, lng] as [number, number]
      );
      L.polyline(latLngs, { color: "blue" }).addTo(mapRef.current);
    }

    // Add start and end markers
    L.marker([startCoords.langtitude, startCoords.longtitude])
      .addTo(mapRef.current)
      .bindPopup("Start");
    L.marker([endCoords.langtitude, endCoords.longtitude])
      .addTo(mapRef.current)
      .bindPopup("End");

    // Cleanup function to destroy the map instance
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [startCoords, endCoords, routeData]);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "200px" }} />
  );
};

export default MapRoute;
