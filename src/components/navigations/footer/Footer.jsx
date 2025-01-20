import React from 'react'
import styles from"./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Fortunatus Ihedoro. All Rights Reserved.</p>
      <ul className={styles.footerLinks}>
        <li><a href="/">Terms of Service</a></li>
        <li><a href="/">Privacy Policy</a></li>
        <li><a href="/">Contact Us</a></li>
      </ul>
    </footer>
  )
}

export default Footer
