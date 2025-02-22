import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../../context/CitiesContext";
import { useCallback, useEffect, useMemo } from "react";
import Spinner from "../re-usables/spinners/Spinner";
import BackButton from "../re-usables/button/BackButton";
import Button from "../re-usables/button/Button";
import Message from "../re-usables/message/Message";

// Memoize the date formatter to avoid recreating it on every render
const formatDate = (date) => {
  if (!date) return "Invalid date"; // Handle invalid or missing date
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
};

function City() {
  const { id } = useParams();
  const { currentCity, getCity, isLoading, deleteCity } = useCities();
  const navigate = useNavigate();

  
  useEffect(() => {
    getCity(id);
  }, [id, getCity]);

  // Memoize the formatted date to avoid recalculating it on every render
  const formattedDate = useMemo(() => formatDate(currentCity.date), [currentCity.date]);

  // Memoize the delete handler to avoid recreating it on every render
  const handleDelete = useCallback(async () => {
    try {
      await deleteCity(id);
      navigate("/app/cities");
    } catch (error) {
      // Error is already handled in context
    }
  }, [deleteCity, id, navigate]);

  // Memoize the Wikipedia link to avoid recalculating it on every render
  const wikipediaLink = useMemo(
    () => `https://en.wikipedia.org/wiki/${currentCity.cityName}`,
    [currentCity.cityName]
  );

  // Early return for loading state
  if (isLoading) return <Spinner />;

  // Early return if no city is found
  if (!currentCity.id) return <Message message="No city found" />;

  const { cityName, emoji, notes } = currentCity;

  return (
    <div className={styles.city}>
      {/* City Name */}
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      {/* Visit Date */}
      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formattedDate}</p>
      </div>

      {/* Notes (Conditional Rendering) */}
      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      {/* Wikipedia Link */}
      <div className={styles.row}>
        <h6>Learn more</h6>
        <a href={wikipediaLink} target="_blank" rel="noreferrer">
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      {/* Buttons */}
      <div className={`${styles.row} ${styles.buttons}`}>
        <Button type="secondary" text="🗑️ Delete" onClick={handleDelete} />
        <BackButton />
      </div>
    </div>
  );
}

export default City;