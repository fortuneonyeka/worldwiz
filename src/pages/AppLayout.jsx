import React from "react";
import AppNav from "../components/appNav/AppNav";
import SideBar from "../components/SideBar";
import styles from "./AppLayout.module.css";
import Map from "../components/map/Map";


const AppLayout = () => {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
};

export default AppLayout;
