import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

export const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIstLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentCity, setCurrentCity] = useState({});

  const BASE_URL = "http://localhost:8000";

  useEffect(() => {
    setIstLoading(true);
    const fetchCities = async () => {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        if (res.ok) {
          const data = await res.json();

          setCities(data);
          setIstLoading(false);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIstLoading(false);
      }
    };
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIstLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (res.ok) {
        const data = await res.json();

        setCurrentCity(data);
        setIstLoading(false);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIstLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, error, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
};

export const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside citiesProvider");
  return context;
};
