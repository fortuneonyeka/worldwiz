import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "./Logo";

const Header = () => {
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
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
        <li>
          <NavLink
            to="/login"
            className={styles.ctaLink}
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
