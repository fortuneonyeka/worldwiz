import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useCities } from "../../context/CitiesContext";
import DetectClick from "./DetectClick";
import ChangeCenter from "./ChangeCenter";
import { useGeolocation } from "../../hooks/useGeoLocation";
import Button from "../button/Button";

const Map = () => {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const [searchParams] = useSearchParams();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPosition)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button
          type="position"
          onClick={getPosition}
          text={isLoadingPosition ? "...Loading" : "Use your position"}
        />
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName},</span>
              <span>{city.country}</span>
            </Popup>
          </Marker>
        ))}
        {/* Add a Marker for the current geolocation position */}
        {geoLocationPosition && (
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
