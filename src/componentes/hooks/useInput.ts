import { ChangeEvent, FocusEvent, useState } from 'react'
interface elemtent{
value:string,
onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
type:string,
onBlur:(e:FocusEvent<HTMLInputElement>)=>void
}
export function useOperations():[string,elemtent]{
	const [valor,setValor] = useState('A u B')
  const acepted = ['u','n']
	const cambio = (event:ChangeEvent<HTMLInputElement>)=>{
		const value = event.target.value
    const leter = value[value.length-1]===' '?value[value.length-2]:value[value.length-1]
		if(valor.length>value.length){
	const result = value.split(' ').join('').split('').join(' ')
			setValor(result)
		}else if(/^[A-Za-z]+$/.test(leter) ){
      const par = value.split(' ').join('').length%2!==0
      if(!par && acepted.includes(value[value.length-1])){
        const leter = value[value.length-1].toLocaleLowerCase()
        const nuevo = valor+' '+leter
        setValor(nuevo)
      }else if(par && !acepted.includes(value[value.length-1])){
        const leter = value[value.length-1].toLocaleUpperCase()
        const nuevo = valor+' '+leter
        setValor(nuevo)
      }
    }
	}
	const dormir = ()=>{
	}
	return [valor.split(' ').join(''),{value:valor,onChange:cambio,onBlur:dormir,type:'text'}]
}
export function useElements(value:string | null,values: null | string[],id:string,update:(id:string,valores:string[])=>void):elemtent{
const [valor,setValor] = useState(value !== null ? value : values !==null? values.join(', ') : '')
const elemtents = valor.split(', ')
const cambio = (event:ChangeEvent<HTMLInputElement>)=>{
  const valores = event.target.value
	const agregado = valores[valores.length-1]
  if(valores.length<valor.length){
    setValor(valores)
  }else	if(agregado===' '){
    setValor(valor+', ')
  }else	if(!elemtents.includes(agregado) && /^[0-9]+$/.test(agregado)){
		const result = valor+agregado
		setValor(result)
	}
}
const guardar = ():void=>{
  const sinvacio = elemtents.filter((element)=>{return element!==''})
  update(id,sinvacio)
}
return{value:valor,onChange:cambio,type:'text',onBlur:guardar}
}
export function useName(value:string,id:string,update:(name:string,newName:string)=>void=()=>{}):elemtent{
	const [valor,setValor] = useState<string>(value)
	const cambio = (event:ChangeEvent<HTMLInputElement>)=>{
		const nuevoValor = event.target.value
		if(nuevoValor.length===1 && /^[A-Za-z]+$/.test(nuevoValor) ){
			setValor(nuevoValor.toUpperCase())
		}else if(nuevoValor.length === 0){
			setValor('')
		}
	}
  const guardar = ():void=>{
    if(valor.length===0){
      setValor(value)
    }else{
    update(id,valor)
  }
  }
	return{value:valor,onChange:cambio,type:'text',onBlur:guardar}
}