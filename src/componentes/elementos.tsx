
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import Conjunto from "./conjunto"
import { useOperations } from "./hooks/useInput.ts"
interface element {
  name: string,
  elements: string[],
  id: string
}
interface props {
  diccionario: { [clave: string]: string[] }
}
function getIterable(json: { [clave: string]: string[] }): element[] {
  return Object.keys(json).map((clave) => { return { name: clave, elements: json[clave], id: uuidv4() } })
}
function getObject(elements: element[]): { [clave: string]: string[] } {
  const dicionario: { [clave: string]: string[] } = {}
  elements.forEach((element) => {
    dicionario[element.name] = element.elements ? element.elements : []
  })
  return dicionario
}
function union(element1: string[] = [], element2: string[] = []): string[] {
  if (element1 === null && element2 === null) {
    return []
  }
  if (element1 === null) {
    return element2
  }
  if (element2 === null) {
    return element1
  }
  return element1.concat(element2.filter((value) => {
    return !element1.includes(value)
  }))
}
function interseccion(element1: string[] = ['a', 'b'], element2: string[] = ['b', 'c']): string[] {
  if (element1 === null || element2 === null) {
    return []
  }
  return element1.filter((element) => { return element2.includes(element) })
}
function operar(operaciones: string, diccionario: { [clave: string]: string[] }) {
  if (operaciones.length === 0) {
    return []
  }
  const claves = Object.keys(diccionario)
  const iterar = operaciones.split('')
  let result: string[] = claves.includes(iterar[0]) ? diccionario[iterar[0]] : []
  for (let index = 2; index < iterar.length; index += 2) {
    const operacion = iterar[index - 1];
    const segundo = diccionario[iterar[index]]
    if (!claves.includes(iterar[index])) {
      //
    } else if (operacion === 'u') {
      result = union(result, segundo)
    } else {
      result = interseccion(result, segundo)
    }
  }
  return result
}
const Elementos: React.FC<props> = ({ diccionario }) => {
  const [elements, setElements] = useState<element[]>(getIterable(diccionario))
  const dicionary = getObject(elements)
  const [value, inputx] = useOperations()
  const resultados = operar(value, dicionary)
  const agregar = () => {
    const used = Object.keys(dicionary)
    const abcdario = 'ABCDFGHIJKLMOPQRSTVWXY'
    const newName = abcdario.split('').filter((letra) => { return !used.includes(letra) })[0]
    let existing = false
    for (let index = 0; index < elements.length; index++) {
      const { name } = elements[index];
      if (name === newName) {
        existing = true
        break
      }
    }
    if (!existing) {
      const newElements = [...elements]
      newElements.push({ name: newName, elements: [], id: uuidv4() })
      setElements(newElements)
    }
  }
  const remove = (id: string) => {
    const newElements: element[] = elements.filter((element) => { return element.id !== id })
    if (newElements.length !== elements.length) {
      setElements(newElements)
    }
  }
  const update = (id: string, valores: string[]) => {
    const newElements: element[] = elements.map((element) => {
      if (element.id === id) {
        return { name: element.name, elements: valores, id: id }
      } else {
        return element
      }
    })
    setElements(newElements)

  }
  const rename = (id: string, newName: string) => {
    setElements(elements.map((element) => {
      if (element.id === id) {
        return { name: newName, elements: element.elements, id: id }
      } else {
        return element
      }
    }))
  }

  return (<>
    <section className="columnas">
      <div className="outputs">
        operaciónes<br />
        <input {...inputx} /><br />
        resultado<br />
        {value.split('').join(' ') + ' = { ' + resultados.join(', ') + ' } '}
      </div>
      <div className="inputs">
        conjuntos
        {elements.map(({ name, elements, id }, index) => {
          return (<Conjunto
            id={id}
            name={name}
            valores={elements}
            remove={remove}
            update={update}
            rename={rename}
            index={index}
            usados={Object.keys(dicionary)} />)
        })}
        <button className="agregar" onClick={agregar}>Agregar</button>
      </div>
    </section>
  </>)
}
export default Elementos