import React from 'react'
import styles from './Map.module.css'
import { useSearchParams } from 'react-router-dom';

const Map = () => {
  const [searchParams, setSearchParrams] = useSearchParams()
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")
  console.log(lat);
  
  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <p>lat: {lat} lng: {lng}</p>
     
    </div>
  )
}

export default Map
