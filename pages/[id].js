import Confirm from "../components/Confirm.js";
import When from "../components/When.js";
import Where from "../components/Where.js";
import Who from "../components/Who.js";
import { server } from "../config";

// This function gets called at build time
export async function getStaticPaths() {
  const req = await fetch(`${server}/api/paths`);
  const res = await req.json();

  const slugs = res?.data.flat(); // remove empty values

  // Get the paths we want to pre-render based on slugs
  const paths = slugs.map((slug) => ({
    params: { id: slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const req = await fetch(`${server}/api/names`);
  const res = await req.json();

  // matrix of names and paths, eg: [["Patrick Lima", "patrick-lima"], ["Juliana", "juliana"]]
  const selectedName = res?.data.find(([_, path]) => path === params.id);

  return {
    props: {
      currentName: selectedName[0] ?? null,
    },
  };
}

export default function Home({ currentName }) {
  return (
    <div className="container">
      <div className="contents">
        <Who name={currentName} />
        <When />
        <Where />

        <Confirm />
      </div>
    </div>
  );
}
