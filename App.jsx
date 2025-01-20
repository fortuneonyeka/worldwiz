import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./src/pages/HomePage";
import Product from "./src/pages/Product";
import Pricing from "./src/pages/Pricing";
import Header from "./src/components/navigations/header/Header";
import Footer from "./src/components/navigations/footer/Footer";
import PageNotFound from "./src/pages/PageNotFound";
import AppLayout from "./src/pages/AppLayout";
import Login from "./src/pages/Login";
import Form from "./src/components/Form";
import CityList from "./src/components/CityList";
import CountryList from "./src/components/CountryList";

function App() {

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
    <div>
      <BrowserRouter>
        {/* <Header /> */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="products" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="app" element={<AppLayout />}>
              <Route index element={<CityList cities={cities} isLoading={isLoading} error={error}/>} />
              <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} error={error}/>} />
              <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} error={error}/>} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
