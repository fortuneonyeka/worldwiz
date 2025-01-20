import React from "react";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

const CountriesList = ({ cities, isLoading, error }) => {
  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;
  if (!cities.length)
    return (
      <Message message="Add your own city by clicking on a city on the map 👉🏻" />
    );

    const countries = cities.reduce((arr, city) => {
      if (!arr.some((el) => el.country === city.country)) {
        return [...arr, { country: city.country, emoji: city.emoji }];
      }
      return arr;
    }, []);
 
  
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
};

export default CountriesList;
