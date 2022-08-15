import Head from 'next/head'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import Confirm from '../components/Confirm.js'
import Who from '../components/Who.js'
import { loadAll } from '../lib/load-all'

export async function getServerSideProps({ query }) {
  // Get query params from context
  const queryParam = query?.name

  const res = await loadAll()

  // matrix of names and slugs, eg: [["Patrick Lima", "patrick-lima"], ["Juliana", "juliana"]]
  // index + 2 because we have header and 0-based index
  const newMatrix = res?.map((value, index) => [...value, index + 2])

  // eslint-disable-next-line no-unused-vars
  const selected = newMatrix?.filter(([_, slug]) => slug === queryParam)

  return {
    props: {
      current: selected[0] ?? null
    }
  }
}

export default function Home({ current }) {
  const currentName = current?.[0]
  const currentRow = current?.[3]

  const buttonRef = React.createRef()

  const [choice, setChoice] = useState('sim')

  const onChangeValue = (event) => {
    setChoice(event.target.value)
  }

  const onClick = async () => {
    buttonRef.current.classList.toggle('button--loading')

    try {
      const rawResponse = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ choice: choice, row: currentRow })
      })

      const content = await rawResponse.json()

      console.log(content)

      toast('Obrigado por ter confirmado! Esperamos te ver lá.', {
        icon: '🥰',
        duration: 6000,
        style: {
          border: '1px solid #4d8b59',
          padding: '16px',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#4d8b59'
        }
      })

      buttonRef.current.classList.toggle('button--loading')
    } catch (error) {
      console.log(error)

      toast.error(
        'Opa, algo errado aconteceu. Entre em contato conosco, por favor.',
        {
          icon: '🤔',
          duration: 6000,
          style: {
            border: '1px solid #d9534f',
            padding: '16px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#d9534f'
          }
        }
      )

      buttonRef.current.classList.toggle('button--loading')
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Confirmação</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="main">
        <Who name={currentName} />

        <Confirm
          ref={buttonRef}
          onChangeValue={onChangeValue}
          onClick={onClick}
        />
      </div>

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}
