import React from 'react'

import styles from '../styles/Who.module.css'

const Who = ({ name }) => {
  return (
    <div className={styles.who}>
      <h2 className="large-font gold-gradient cursive-font">Patrick Lima</h2>
      <h2 className="large-font gold-gradient cursive-font">&</h2>
      <h2 className="large-font gold-gradient cursive-font">Juliana Said</h2>

      <h2>Convidam para o seu casamento</h2>

      <h1>{name}</h1>
    </div>
  )
}

export default Who
