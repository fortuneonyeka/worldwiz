import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useCities } from "../../context/CitiesContext";
import DetectClick from "./DetectClick";
import ChangeCenter from "./ChangeCenter";
import { useGeolocation } from "../../hooks/useGeoLocation";
import Button from "../button/Button";
import { useUrlPosition } from "../../hooks/useUrlPosition";

const Map = () => {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();
  const [isUsingGeoLocation, setIsUsingGeoLocation] = useState(false);

  // Update map position when URL coordinates change
  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
      setIsUsingGeoLocation(false); // Reset geolocation flag
    }
  }, [mapLat, mapLng]);

  // Update map position when geolocation is used
  useEffect(() => {
    if (geoLocationPosition && isUsingGeoLocation) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition, isUsingGeoLocation]);

  // Handle "Use your position" button click
  const handleUsePosition = () => {
    getPosition();
    setIsUsingGeoLocation(true); // Set flag to indicate geolocation is being used
  };

  return (
    <div className={styles.mapContainer}>
      {!isUsingGeoLocation && (
        <Button
          type="position"
          onClick={handleUsePosition}
          text={isLoadingPosition ? "...Loading" : "Use your position"}
        />
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName},</span>
              <span>{city.country}</span>
            </Popup>
          </Marker>
        ))}
        {/* Add a Marker for the current geolocation position */}
        {geoLocationPosition && isUsingGeoLocation && (
          <Marker position={[geoLocationPosition.lat, geoLocationPosition.lng]}>
            <Popup>Your current location</Popup>
          </Marker>
        )}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

export default Map;