import React, { createContext, useState, useReducer } from 'react'
import robotReducer from './robotReducer'
import messageReducer from './MessageReducer'
import { headRobotIcon } from './styles/icons'

export const MessageManger = createContext()

export default function MessageProvider({ children }){
	const initState = {
		action: 'TO_EN',
		info: 'English Chatbot',
		mode: 'en',
		title: 'English Chatbot',
		icon:headRobotIcon,
		index:0
	}
	const [ input, setInput ] = useState([])
	const reducer = useReducer(robotReducer, initState)
	const mesReducer = useReducer(messageReducer,{enMessage:[],cnMessage:[] ,stMessage:[]  })
	return (
		<div>
			<MessageManger.Provider value={[ input, setInput, reducer,mesReducer ]}>
			{children}
			</MessageManger.Provider>
		</div>
	)
}
