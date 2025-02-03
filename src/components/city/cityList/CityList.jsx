import React from "react";
import styles from "./CityList.module.css";
import Spinner from "../../re-usables/spinners/Spinner";
import CityItem from "../cityItem/CityItem";
import Message from "../../re-usables/message/Message";
import { useCities } from "../../../context/CitiesContext";

const CityList = () => {
  const { cities, isLoading, error } = useCities();

  if (isLoading) return <Spinner />;
  
  if (error) return <Message message={error} />;
  
  if (!cities?.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map 👉🏻" />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem 
          city={city} 
          key={city.id} 
        />
      ))}
    </ul>
  );
};

export default CityList;