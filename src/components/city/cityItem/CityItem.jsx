import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../../../context/CitiesContext";
import DeleteButton from "../../re-usables/button/DeleteButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
const CityItem = ({ city }) => {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity } = useCities();

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time dateTime="" className={styles.date}>
          ({formatDate(date)})
        </time>
        <DeleteButton text="&times;"/>        
      </Link>
    </li>
  );
};

export default CityItem;
