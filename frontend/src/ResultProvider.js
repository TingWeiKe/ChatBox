import React, { createContext,useState } from 'react'

export const ResultManger = createContext();

export default function ResultProvider({ children }){
	const [ result, setResult ] = useState(
		[]
	)
	return (
		<div>
			<ResultManger.Provider value={[result, setResult]}>{children}</ResultManger.Provider>
		</div>
	)
}
