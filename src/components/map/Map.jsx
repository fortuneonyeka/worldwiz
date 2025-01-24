import React, { useEffect, useState } from 'react';
import styles from './Map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useCities } from '../../context/CitiesContext';
import DetectClick from './DetectClick';
import ChangeCenter from './ChangeCenter';

const Map = () => {
  
  const [mapPosition, setMapPosition] = useState([40, 0])
  const { cities } = useCities();
  const [searchParams] = useSearchParams()
  const mapLat = searchParams.get("lat")
  const mapLng = searchParams.get("lng")


  useEffect(() => {
    if(mapLat && mapLng)setMapPosition([mapLat,mapLng]);
  },[mapLat,mapLng])
  return (
    <div className={styles.mapContainer} >
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
        <ChangeCenter position={mapPosition}/>
        <DetectClick />
      </MapContainer>
    </div>
  );
};




export default Map;

