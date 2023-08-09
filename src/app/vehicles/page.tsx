import Link from "next/link"
import { manufacturers } from "../../../temp/vhicles_data"

const Vehicles = () => {

  const items = Object.keys(manufacturers).map((m) => {
    return (
      <>
      <Link key={m} href={`/vehicles/${m}`}>{m}</Link>
      <br />
      </>
    )
  })
  return (
    <>
    <p>List of manufactureers</p>
    {items}
    </>
  )
}

export default Vehicles