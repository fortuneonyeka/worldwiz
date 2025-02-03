import React from 'react'

import styles from "../../city/cityItem/CityItem.module.css";

const DeleteButton = ({text, className}) => {
  return (
    <button className={`${styles.deleteBtn} ${className}`}>
      {text}
    </button>
  )
}

export default DeleteButton
