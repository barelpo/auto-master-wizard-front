import Link from "next/link"
import { manufacturers } from "../../../../temp/vhicles_data"

const Manufacturer = ({params}: {params: any}) => {

  //@ts-ignore
  const items = Object.keys(manufacturers[params.manufacturer]).map((m) =>{
    return (
      <>
      <Link key={m} href={`/vehicles/${params.manufacturer}/${m}`}>{m}</Link>
      <br />
      </>
    )
  })

  return (
    <>
    <p>{`List of models for ${params.manufacturer}`}</p>
    {items}
    </>
  )
}

export default Manufacturer