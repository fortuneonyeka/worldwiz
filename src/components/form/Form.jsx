import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../re-usables/button/Button";
import BackButton from "../re-usables/button/BackButton";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Message from "../re-usables/message/Message";
import Spinner from "../re-usables/spinners/Spinner";

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
  const [formData, setFormData] = useState({
    cityName: "",
    country: "",
    date: new Date().toISOString().slice(0, 10),
    notes: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
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

        // Update form data
        setFormData((prev) => ({
          ...prev,
          cityName: data.city || data.locality || "",
          country: data.countryName || "",
        }));

        // Update emoji
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

  const navigate = useNavigate();

  if (isLoadingGeoCoding) {
    return <Spinner />;
  }
  if (!lat && !lng) return <Message message={"No co-ordinate found, click on a location in the map 😊"}/>

  if (geocodingError) {
    return <Message message={geocodingError} />;
  }

  return (
    <form className={styles.form}>
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
        <input
          id="date"
          type="date"
          onChange={handleChange}
          value={formData.date}
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
        <Button
          type="primary"
          text="Add"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        />
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
