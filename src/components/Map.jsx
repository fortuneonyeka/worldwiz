import React from 'react'
import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom';

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")
  const navigate = useNavigate()  
  return (
    <div className={styles.mapContainer} onClick={() =>navigate("form")}>
      <h1>Map</h1>
      <p>lat: {lat} lng: {lng}</p>
     
      <button onClick={() => setSearchParams({lat:23,lng:25})}>Change Position</button>

    </div>
  )
}

export default Map
