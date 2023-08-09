const SubModel = ({params}: {params: any}) => {
  return (
    <p>{`List of trims for ${params.manufacturer} ${params.model} ${params.subModel}`}</p>
  )
}

export default SubModel