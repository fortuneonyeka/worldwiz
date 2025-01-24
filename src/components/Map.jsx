import React, { useState } from 'react';
import styles from './Map.module.css';
import { useNavigate } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useCities } from '../context/CitiesContext';

const Map = () => {
  const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40,0])

  return (
    <div className={styles.mapContainer} >
      <MapContainer 
        center={mapPosition} 
        zoom={13} 
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
            position={mapPosition}
          >
            <Popup>
              {city.cityName}, {city.country}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;