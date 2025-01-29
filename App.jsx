import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./src/pages/HomePage";
import Product from "./src/pages/Product";
import Pricing from "./src/pages/Pricing";
import Header from "./src/components/navigations/header/Header";
import Footer from "./src/components/navigations/footer/Footer";
import PageNotFound from "./src/pages/PageNotFound";
import AppLayout from "./src/pages/AppLayout";
import Login from "./src/pages/Login";
import Form from "./src/components/Form";
import CityList from "./src/components/city/cityList/CityList";
import City from "./src/components/city/City";
import CountryList from "./src/components/CountryList";
import { CitiesProvider } from "./src/context/CitiesContext";

function App() {
  return (
    <div>
      <CitiesProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          {/* <Header /> */}
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="products" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route path="app" element={<AppLayout />}>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
          {/* <Footer /> */}
        </BrowserRouter>
      </CitiesProvider>
    </div>
  );
}

export default App;
