import { useState } from 'react'

import Confirm from '../components/Confirm.js'
import Who from '../components/Who.js'
import { loadGuests } from '../lib/load-guests'

export async function getServerSideProps({ query }) {
  // Get query params from context
  const queryParam = query?.name

  const res = await loadGuests()

  // matrix of names and slugs, eg: [["Patrick Lima", "patrick-lima"], ["Juliana", "juliana"]]
  // eslint-disable-next-line no-unused-vars
  const selectedName = res?.find(([_, slug]) => slug === queryParam)

  return {
    props: {
      currentName: selectedName[0] ?? null
    }
  }
}

export default function Home({ currentName }) {
  const [accepted, setAccepted] = useState('sim')

  const onChangeValue = (event) => {
    setAccepted(event.target.value)
  }

  const onClick = () => {
    console.log(accepted)
  }

  return (
    <div className="container">
      <div className="main">
        <Who name={currentName} />

        <Confirm onChangeValue={onChangeValue} onClick={onClick} />
      </div>
    </div>
  )
}
