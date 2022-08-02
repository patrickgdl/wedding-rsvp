import React from 'react'

import styles from '../styles/When.module.css'

const When = () => {
  return (
    <div className={styles.when}>
      <h1>Domingo</h1>

      <h2 className={styles.day}>23</h2>

      <h2>de</h2>

      <h1>Outubro</h1>

      <h2>
        às <span className={styles.hour}>4 horas</span>
      </h2>
    </div>
  )
}

export default When
