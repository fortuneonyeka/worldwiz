import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink
            to="/"
            // className={({ isActive }) => (isActive ? styles.active : "")}
           
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            // className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pricing"
            // className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Pricing
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
