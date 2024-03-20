import { useElements, useName } from './hooks/useInput'
interface props {
	name: string,
	valores: string[],
	remove: (name: string) => void,
	update: (name: string, valores: string[]) => void,
	rename: (name: string, newName: string) => void,
	index: number,
	usados: string[],
	id: string
}
const Conjunto: React.FC<props> = ({ name, valores, rename, update, remove, id }) => {
	const quitar = () => {
		remove(id)
	}
	const variablex = useName(name, id, rename)
	const elementsx = useElements(null, valores, id, update)
	return (<>
		<div className="conjunto" id={id}>
			-
			<input className='name' {...variablex} />
			{' = { '}
			<input className='elementos' {...elementsx} />
			{' } '}<button onClick={quitar} className='quitar'>X</button>
		</div>
	</>)
}
export default Conjunto