import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

export const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentCity, setCurrentCity] = useState({});

  const BASE_URL = "http://localhost:8000";

  useEffect(() => {
    setIsLoading(true);
    const fetchCities = async () => {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        if (res.ok) {
          const data = await res.json();
          setCities(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (res.ok) {
        const data = await res.json();
        setCurrentCity(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, error, currentCity, getCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside CitiesProvider");
  return context;
};