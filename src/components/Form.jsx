import { useState } from "react";
import styles from "./Form.module.css";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [formData, setFormData] = useState({
    cityName: "",
    country: "",
    date: new Date().toISOString().slice(0, 10), // Default to today's date
    notes: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={handleChange}
          value={formData.cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {formData.cityName}?</label>
        <input
          id="date"
          type="date"
          onChange={handleChange}
          value={formData.date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">
          Notes about your trip to {formData.cityName}
        </label>
        <textarea
          id="notes"
          onChange={handleChange}
          value={formData.notes}
        />
      </div>

      <div className={styles.buttons}>
        <button type="button">Add</button>
        <button type="button">&larr; Back</button>
      </div>
    </form>
  );
}

export default Form;
