import Action from '../components/Action.js'
import When from '../components/When.js'
import Where from '../components/Where.js'
import Who from '../components/Who.js'
import { loadGuests } from '../lib/load-guests'
import { loadGuestsAndPaths } from '../lib/load-guests-and-paths'

// This function gets called at build time and on the server side
export async function getStaticPaths() {
  const res = await loadGuestsAndPaths()

  const slugs = res?.flat() // remove empty values

  // Get the paths we want to pre-render based on slugs
  const paths = slugs?.map((slug) => ({
    params: { id: slug }
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await loadGuests()

  // matrix of names and slugs, eg: [["Patrick Lima", "patrick-lima"], ["Juliana", "juliana"]]
  // eslint-disable-next-line no-unused-vars
  const selectedName = res?.find(([_, slug]) => slug === params.id)

  return {
    props: {
      currentName: selectedName[0] ?? null
    }
  }
}

export default function Home({ currentName }) {
  return (
    <div className="container">
      <div className="main">
        <Who name={currentName} />
        <When />
        <Where />

        <Action />
      </div>
    </div>
  )
}
