import React from 'react'
import styles from "./Sidebar.module.css"
import Logo from './navigations/header/Logo';
import AppNav from './navigations/AppNav';
import Footer from './navigations/footer/Footer';

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>

      <Footer />
    </div>
  )
}

export default SideBar
