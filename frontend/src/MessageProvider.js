import React, { createContext, useState, useReducer } from 'react'
import robotReducer from './robotReducer'
import messageReducer from './MessageReducer'
import { mixRobotIcon } from './styles/icons'

export const MessageManger = createContext()

export default function MessageProvider({ children }){

	const initState = {
		action: 'TO_MIX',
		info: '(English Chatbot + StackBot)',
		mode: 'mix',
		title: 'MixRobot',
		icon:mixRobotIcon,
		index:0
	}
	const [ input, setInput ] = useState([])
	const reducer = useReducer(robotReducer, initState)
	const mesReducer = useReducer(messageReducer,{mixMessage:[],enMessage:[],cnMessage:[] ,stMessage:[]  })
	return (
		<div>
			<MessageManger.Provider value={[ input, setInput, reducer,mesReducer ]}>
			{children}
			</MessageManger.Provider>
		</div>
	)
}
