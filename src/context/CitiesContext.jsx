import { createContext, useContext, useEffect, useState } from "react";

const CitiesContetext = createContext()

export const CitiesProvider  = ({children}) => {


  const [cities, setCities] = useState([])
  const [isLoading, setIstLoading] = useState(false)
  const [error, setError] = useState("")

  const BASE_URL = "http://localhost:8000"

  useEffect(() => {
    setIstLoading(true)
    const fetchCities =  async () => {
      try {
        const res = await fetch(`${BASE_URL}/cities`)
        if(res.ok) {
          const data = await res.json()
          
          setCities(data)
          setIstLoading(false)
        }
      } catch (error) {
        setError(error.message)
      }finally {
        setIstLoading(false)
      }
    }
    fetchCities()
  },[])





  return (
    <CitiesContetext.Provider value={{cities, setCities,isLoading, setIstLoading, error, setError}}>
      {children}
    </CitiesContetext.Provider>
  )
}

export const useCities = () => {
  const context = useContext(CitiesContetext)
  if(!context) throw new Error("useCities must be used withing citiesProvider")
  return context
}