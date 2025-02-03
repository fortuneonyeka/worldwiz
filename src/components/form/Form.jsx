import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../re-usables/button/Button";
import BackButton from "../re-usables/button/BackButton";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Message from "../re-usables/message/Message";
import { useCities } from "../../context/CitiesContext";
import Spinner from "../re-usables/spinners/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");
  const [emoji, setEmoji] = useState("");
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cityName: "",
    country: "",
    date: new Date(),
    notes: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!lat || !lng) {
      return;
    }

    if (isLoading) {
      return <Spinner />
    }

    try {
      const newCity = {
        cityName: formData.cityName,
        country: formData.country,
        emoji: emoji,
        date: formData.date.toISOString(),
        notes: formData.notes,
        position: { lat, lng }
      };

      await createCity(newCity);
      navigate('/app/cities');
      
    } catch (error) {
      setGeocodingError(error.message);
    }
  };

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityDetails() {
      try {
        setIsLoadingGeoCoding(true);
        setGeocodingError("");

        const url = `${BASE_URL}?latitude=${lat}&longitude=${lng}`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("API Response not OK: Failed to fetch location data");
        }

        const data = await res.json();

        if (!data.city && !data.locality) {
          throw new Error(
            "No city found at this location. Please click somewhere else."
          );
        }

        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city or a country, select another location 😊"
          );

        setFormData((prev) => ({
          ...prev,
          cityName: data.city || data.locality || "",
          country: data.countryName || "",
        }));

        if (data.countryCode) {
          const newEmoji = convertToEmoji(data.countryCode);
          setEmoji(newEmoji);
        }
      } catch (error) {
        console.error("Geocoding Error:", error);
        setGeocodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    fetchCityDetails();
  }, [lat, lng]);

  if (isLoadingGeoCoding) {
    return <Spinner />;
  }
  if (!lat && !lng) return <Message message={"No co-ordinate found, click on a location in the map 😊"}/>

  if (geocodingError) {
    return <Message message={geocodingError} />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">Country name</label>
        <input
          id="country"
          onChange={handleChange}
          value={formData.country}
          required
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <div className={styles.inputWithFlag}>
          <input
            id="cityName"
            onChange={handleChange}
            value={formData.cityName}
            required
          />
        </div>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {formData.cityName}?</label>
        <DatePicker
          id="date"
          selected={formData.date}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          required
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">
          Notes about your trip to {formData.cityName} city of{" "}
          {formData.country}
        </label>
        <textarea id="notes" onChange={handleChange} value={formData.notes} />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" text="Add" />
        <BackButton />
      </div>
    </form>
  );
}

export default Form;