const Model = ({params}: {params: any}) => {
  return (
    <p>{`List of submodels for ${params.manufacturer} ${params.model}`}</p>
  )
}

export default Model