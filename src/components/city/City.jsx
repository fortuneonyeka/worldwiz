import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../../context/CitiesContext";
import { useEffect } from "react";
import Spinner from "../re-usables/spinners/Spinner";
import BackButton from "../re-usables/button/BackButton";
import Button from "../re-usables/button/Button";
import Message from "../re-usables/message/Message";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { currentCity, getCity, isLoading, deleteCity } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    getCity(id);
  }, [id, getCity]);

  if (isLoading) return <Spinner />;
  if (!currentCity.id) return <Message message="No city found" />;

  const { cityName, emoji, date, notes } = currentCity;

  async function handleDelete() {
    try {
      await deleteCity(id);
      navigate('/app/cities');
    } catch (error) {
      // Error is already handled in context
    }
  }

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer">
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div className={`${styles.row} ${styles.buttons}`}>
        <Button type="secondary" text="🗑️ Delete" onClick={handleDelete} />
        <BackButton />
      </div>
    </div>
  );
}

export default City;