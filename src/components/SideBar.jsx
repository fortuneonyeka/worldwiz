import React from "react";
import styles from "./Sidebar.module.css";
import Logo from "./navigations/header/Logo";
import AppNav from "../components/appNav/AppNav";
import Footer from "./navigations/footer/Footer";
import { Outlet } from "react-router-dom";

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <Footer />
    </div>
  );
};

export default SideBar;
