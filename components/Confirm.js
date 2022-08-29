import React from 'react'

import styles from '../styles/Confirm.module.css'

const Confirm = React.forwardRef(({ onChangeValue, onClick }, ref) => {
  return (
    <div className={styles.actions}>
      <h1>Confirme e continue abaixo</h1>

      <div className={styles.toggle} onChange={onChangeValue}>
        <input
          type="radio"
          name="option"
          value="sim"
          id="yes"
          defaultChecked="checked"
        />
        <label htmlFor="yes">Sim</label>

        <input type="radio" name="option" value="nao" id="nope" />
        <label htmlFor="nope">Não</label>
      </div>

      <h2>Por favor, responda até dia 05 de setembro</h2>

      <button ref={ref} type="button" className={styles.btn} onClick={onClick}>
        <span className="button__text">Finalizar →</span>
      </button>
    </div>
  )
})

Confirm.displayName = 'Confirm'

export default Confirm
