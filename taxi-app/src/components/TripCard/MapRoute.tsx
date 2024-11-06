import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapGenerate } from '../../type/trip';

const MapRoute: React.FC<MapGenerate> = ({
    startCoords,
    endCoords,
    routeData,
  }) => {
    useEffect(() => {
        // Initialize the map
        const map = L.map('map').setView([startCoords.langtitude, startCoords.longtitude], 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Draw the route using coordinates
        const latLngs = routeData.coordinates.flatMap(coordinateGroup =>
            coordinateGroup.map(coord => [coord.langtitude, coord.longtitude])
        );
      
          // Add the polyline to the map
        L.polyline(latLngs, { color: 'blue' }).addTo(map);
      

        // Add start and end markers
        L.marker([startCoords.langtitude, startCoords.longtitude]).addTo(map).bindPopup('Start').openPopup();
        L.marker([endCoords.langtitude, endCoords.longtitude]).addTo(map).bindPopup('End').openPopup();

        return () => {
            map.remove(); // Cleanup map on component unmount
        };
    }, [startCoords, endCoords, routeData]);

    return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default MapRoute;
