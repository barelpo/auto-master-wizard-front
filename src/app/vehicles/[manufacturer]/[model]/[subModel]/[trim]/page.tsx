const Trim = ({params}: {params: any}) => {
  return (
    <p>{`List of parts for ${params.manufacturer} ${params.model} ${params.subModel} ${params.trim}`}</p>
  )
}

export default Trim