import React, { createContext, useState } from 'react'

export const ResultManger = createContext()
export const InputManger = createContext()

export default function ResultProvider({ children }){
	const [ result, setResult ] = useState([])
	const [ input, setInput ] = useState([])
	return (
		<div>
			<InputManger.Provider value={ [ input, setInput ]}s >
				<ResultManger.Provider value={[ result, setResult ]}>{children}</ResultManger.Provider>
			</InputManger.Provider>
		</div>
	)
}
