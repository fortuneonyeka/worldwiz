import { lazy, Suspense } from "react";
import { CitiesProvider } from "./src/context/CitiesContext";
import { AuthProvider } from "./src/context/AuthContext";
import ProtectedRoute from "./src/pages/ProtectedRoute";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SpinnerFullPage from "./src/components/re-usables/spinners/SpinnerFullPage";
import ErrorBoundary from "./src/components/ErrorBoundary";
// import ErrorBoundary from "./src/components/ErrorBoundary"; // Import the ErrorBoundary

const HomePage = lazy(() => import("./src/pages/HomePage"));
const Product = lazy(() => import("./src/pages/Product"));
const Pricing = lazy(() => import("./src/pages/Pricing"));
const Login = lazy(() => import("./src/pages/Login"));
const AppLayout = lazy(() => import("./src/pages/AppLayout"));
const PageNotFound = lazy(() => import("./src/pages/PageNotFound"));

const CityList = lazy(() => import("./src/components/city/cityList/CityList"));
const City = lazy(() => import("./src/components/city/City"));
const CountryList = lazy(() => import("./src/components/country/countryList/CountryList"));
const Form = lazy(() => import("./src/components/form/Form"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <ErrorBoundary> {/* Wrap the entire app with ErrorBoundary */}
            {/* <Suspense fallback={<SpinnerFullPage />}> */}
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
            {/* </Suspense> */}
          </ErrorBoundary>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;