import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./src/pages/HomePage";
import Product from "./src/pages/Product";
import Pricing from "./src/pages/Pricing";
import PageNotFound from "./src/pages/PageNotFound";
import AppLayout from "./src/pages/AppLayout";
import Login from "./src/pages/Login";
import Form from "./src/components/form/Form";
import CityList from "./src/components/city/cityList/CityList";
import City from "./src/components/city/City";
import CountryList from "./src/components/country/countryList/CountryList";
import { CitiesProvider } from "./src/context/CitiesContext";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import ProtectedRoute from "./src/pages/ProtectedRoute";



function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="products" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />

              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>

              <Route path="/404" element={<PageNotFound />} />
              <Route path="*" element={<Navigate replace to="/404" />} />
            </Routes>
          </main>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
