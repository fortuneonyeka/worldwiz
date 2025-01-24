import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CitiesContext = createContext();

export const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIstLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentCity, setCurrentCity] = useState({});

  const BASE_URL = "http://localhost:8000";
  // const navigate = useNavigate()

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
      
      if (!res.ok) {
        // Handle non-200 responses
        throw new Error(`City not found or network error: ${res.status}`);
      }
  
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      setError(error.message);
      // Optional: Navigate back or show error message
     
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