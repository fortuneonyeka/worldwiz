import React from 'react'
import styles from"./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2025 Fortunatus Ihedoro. All Rights Reserved.</p>
      <ul className={styles.footerLinks}>
        <li><a href="/terms">Terms of Service</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/contact">Contact Us</a></li>
      </ul>
    </footer>
  )
}

export default Footer
