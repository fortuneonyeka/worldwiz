import { CitiesProvider } from "./src/context/CitiesContext";
import { AuthProvider } from "./src/context/AuthContext";
import ProtectedRoute from "./src/pages/ProtectedRoute";

import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./src/pages/HomePage"));
const Product = lazy(() => import("./src/pages/Product"));
const Pricing = lazy(() => import("./src/pages/Pricing"));
const Login = lazy(() => import("./src/pages/Login"));
const AppLayout = lazy(() => import("./src/pages/AppLayout"));
const CityList = lazy(() => import("./src/components/city/cityList/CityList"));
const City = lazy(() => import("./src/components/city/City"));
const CountryList = lazy(() =>
  import("./src/components/country/countryList/CountryList")
);
const Form = lazy(() => import("./src/components/form/Form"));
const PageNotFound = lazy(() => import("./src/pages/PageNotFound"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="products" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />

              {/* Protected Routes */}
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>

              {/* 404 Page */}
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
