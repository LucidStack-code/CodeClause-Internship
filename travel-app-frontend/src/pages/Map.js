// src/pages/Map.js
import React, { useEffect } from "react";
import L from "leaflet";

const Map = () => {
  useEffect(() => {
    const map = L.map("map").setView([20.5937, 78.9629], 5); // Default to India

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup("You are here!")
          .openPopup();
        map.setView([lat, lng], 12);
      });
    }
  }, []);

  return (
    <div>
      <h2>Interactive Map</h2>
      <div id="map" style={{ height: "500px" }}></div>
    </div>
  );
};

export default Map;
