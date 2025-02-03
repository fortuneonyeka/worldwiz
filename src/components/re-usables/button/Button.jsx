import React from 'react'
import styles from './Button.module.css'

const Button = ({text, className, onClick, type}) => {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {text} {className }
    </button>
  )
}

export default Button
