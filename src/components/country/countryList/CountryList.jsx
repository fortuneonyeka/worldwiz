import React from "react";
import styles from "./CountryList.module.css";
import Spinner from "../../re-usables/spinners/Spinner";
import Message from "../../re-usables/message/Message";
import CountryItem from "../countryItem/CountryItem";
import { useCities } from "../../../context/CitiesContext";

const CountriesList = () => {
  const { cities, isLoading, error } = useCities();
  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;
  if (!cities.length)
    return (
      <Message message="Add your own city by clicking on a city on the map 👉🏻" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.some((el) => el.country === city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji ,currency: city.currency,language:city.language}];
    }
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
};

export default CountriesList;
