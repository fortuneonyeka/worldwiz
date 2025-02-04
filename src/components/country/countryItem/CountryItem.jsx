import styles from "./CountryItem.module.css";

function CountryItem({ country, key }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
      <span className={styles.currency}>Currency: {country.currency || '💱'}</span>
      <span className={styles.language}>Language: {country.language || 'Unknown'}</span>
      
    </li>
  );
}

export default CountryItem;
