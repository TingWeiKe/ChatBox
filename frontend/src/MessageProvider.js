import React, { createContext, useState, useReducer } from 'react'
import robotReducer from './robotReducer'
import messageReducer from './MessageReducer'
import { mixRobotIcon } from './styles/icons'

export const MessageManger = createContext()
export default function MessageProvider({ children }){
	const initRobotState = {
		action: 'TO_MIX',
		info: '(English Chatbot + StackBot)',
		mode: 'mix',
		title: 'MixRobot',
		icon: mixRobotIcon,
		index: 0,
	}

	let initMessageState = { mixMessage: [], enMessage: [], cnMessage: [], stMessage: [] }
	if (typeof localStorage !== 'undefined') {
		// 瀏覽器是否支援Storage
		if (!localStorage.message) {
			//瀏覽器是否已存Storage
			localStorage.setItem('message', JSON.stringify(initMessageState))
		}
	}

	let messageList = JSON.parse(localStorage.getItem('message'))
	const [ input, setInput ] = useState([])
	const reducer = useReducer(robotReducer, initRobotState)
	const mesReducer = useReducer(messageReducer, messageList)
	return (
		<div>
			<MessageManger.Provider value={[ input, setInput, reducer, mesReducer ]}>{children}</MessageManger.Provider>
		</div>
	)
}
