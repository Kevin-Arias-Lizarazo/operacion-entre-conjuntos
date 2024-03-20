import Elementos from "./componentes/elementos"
function App() {
  const dicionary: { [clave: string]: string[] } = {
    'A': ['a', 'b', 'c'],
    'B': ['c', 'd', 'e']
  }
  return (
    <>
      <Elementos diccionario={dicionary} />
    </>
  )
}

export default App
