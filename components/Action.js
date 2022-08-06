import { useRouter } from 'next/router'
import React from 'react'

import styles from '../styles/Action.module.css'
import Check from './icons/Check'
import Gift from './icons/Gift'
import PigMoney from './icons/PigMoney'
import ToastWine from './icons/ToastWine'

const options = [
  {
    description: 'Localização do Evento',
    newWindow: true,
    link: 'https://g.page/chacarabaldaneventos?share',
    Icon: ToastWine
  },
  {
    description: 'Confirmar Presença',
    link: '/confirm',
    Icon: Check
  },
  {
    description: 'Lista de Presentes',
    newWindow: true,
    link: 'https://lista.havan.com.br/Convidado/ItensListaPresente/631179',
    Icon: Gift
  },
  {
    description: 'Presente em Dinheiro',
    newWindow: true,
    link: 'https://nubank.com.br/pagar/2j9z2/uYWoPjhzeT',
    Icon: PigMoney
  }
]

const Action = () => {
  const router = useRouter()

  return (
    <div className={styles.actions}>
      <div className={styles.container}>
        {options.map(({ description, link, newWindow, Icon }) => (
          <div key={description} className={styles.wrapper}>
            {newWindow ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="button"
              >
                <Icon />
              </a>
            ) : (
              <a
                href={`${link}?name=${router.asPath.slice(1)}`}
                className="button"
              >
                <Icon />
              </a>
            )}

            <p className={styles.description}>{description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Action
