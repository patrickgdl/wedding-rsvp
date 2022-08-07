import { useState } from 'react'

import Confirm from '../components/Confirm.js'
import Who from '../components/Who.js'
import { loadAll } from '../lib/load-all'

export async function getServerSideProps({ query }) {
  // Get query params from context
  const queryParam = query?.name

  const res = await loadAll()

  // matrix of names and slugs, eg: [["Patrick Lima", "patrick-lima"], ["Juliana", "juliana"]]
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
  const [alreadyConfirmed, setAlreadyConfirmed] = useState(false)
  const [accepted, setAccepted] = useState('sim')

  const onChangeValue = (event) => {
    setAccepted(event.target.value)
  }

  const onClick = async () => {
    try {
      const rawResponse = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ choice: accepted, row: current[3] })
      })

      const content = await rawResponse.json()

      setAlreadyConfirmed(true)

      // print to screen
      console.log(content)
      alert('Obrigado por ter confirmado! Esperamos te ver lá 🥰')
    } catch (error) {
      console.log(error)

      alert(
        'Algo de errado aconteceu, entre em contato com a gente para verificar o que pode ter acontecido.'
      )
    }
  }

  return (
    <div className="container">
      <div className="main">
        <Who name={current[0]} />

        {!alreadyConfirmed && (
          <Confirm onChangeValue={onChangeValue} onClick={onClick} />
        )}
      </div>
    </div>
  )
}
