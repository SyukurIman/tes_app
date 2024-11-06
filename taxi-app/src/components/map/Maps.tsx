import { useEffect, useRef } from "react";

const Maps: React.FC = () => {
  const mapContainer = useRef(null);

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos: any) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function errors(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
      .query({ name: "geolocation" })
      .then(function () {
          navigator.geolocation.getCurrentPosition(success, errors, options);
      });
  } else {
      console.log("Geolocation is not supported by this browser.");
  }    
  }, []);

  useEffect(() => {
    
  });

  return <div ref={mapContainer} className="map-container" />;
};

export default Maps;
