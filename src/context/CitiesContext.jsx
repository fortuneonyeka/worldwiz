import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CitiesContext = createContext();

export const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentCity, setCurrentCity] = useState({});
  const BASE_URL = "http://localhost:8000";

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error("Failed to fetch cities");
        const data = await res.json();
        setCities(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (id === currentCity.id) return;

    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      
      if (!res.ok) {
        throw new Error(`City not found or network error: ${res.status}`);
      }
  
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      setError("");
      
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCity)
      });

      if (!res.ok) {
        throw new Error('Failed to create city');
      }

      const data = await res.json();
      setCities(cities => [...cities, data]);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      setError("");

      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error(`Failed to delete city`);

      setCities(cities => cities.filter(city => city.id !== id));
      
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ 
        cities, 
        isLoading, 
        error, 
        currentCity, 
        getCity,
        createCity,
        deleteCity
      }}>
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