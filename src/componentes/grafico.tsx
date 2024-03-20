interface props {
  elementos: string[],
  position: string
}
const Diagrama: React.FC<props> = ({ elementos, position }) => {
  return (<div className={`diagrama ${position}`}>
    {elementos.join(' ')}
  </div>)
}
export default Diagrama