import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  error: "",
  currentCity: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
        error: "",
      };

      case "city/loaded":
        return {
          ...state, isLoading: false, currentCity:action.payload, error:""
        }

    case "city/created":
      return {
        ...state, isLoading:false, cities:[...state.cities, action.payload],
        currentCity:action.payload
      };

    case "city/deleted":
      return {
        ...state, isLoading:false, cities: state.cities.filter((c) => c.id !== action.payload) ,
      
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Inalid action type:" + action.type);
  }
};

export const CitiesProvider = ({ children }) => {
  
  const [{ cities, isLoading, error, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error("Failed to fetch cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: error });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    
    if (id === currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);

      if (!res.ok) {
        throw new Error(`City not found or network error: ${res.status}`);
      }

      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch  {
      dispatch({ type: "rejected", payload: "Failed to load city" });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });

      if (!res.ok) {
        throw new Error("Failed to create city");
      }

      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
      return data;
    } catch  {
      dispatch({ type: "rejected", payload: "Failed to add city" });
      throw error;
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error(`Failed to delete city`);
      dispatch({ type: "city/deleted", payload: id });
    } catch  {
      dispatch({ type: "rejected", payload: "Failed to delete city" });
      throw error;
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
        deleteCity,
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
