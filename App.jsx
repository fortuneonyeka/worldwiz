import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./src/pages/HomePage";
import Product from "./src/pages/Product";
import Pricing from "./src/pages/Pricing";
import Header from "./src/components/navigations/header/Header";
import Footer from "./src/components/navigations/footer/Footer";
import PageNotFound from "./src/pages/PageNotFound";
import AppLayout from "./src/pages/AppLayout";
import Login from "./src/pages/Login";
import City from "./src/components/City";
import CountryItem from "./src/components/CountryItem";
import Form from "./src/components/Form";

function App() {
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
              <Route index element={<City />} />
              <Route path="cities" element={<City />} />
              <Route path="countries" element={<CountryItem />} />
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
