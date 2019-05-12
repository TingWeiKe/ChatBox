import React, { useContext, useState } from 'react'
import MessageList from './MessageList'
import UserInput from './UserInput'
import MessageHead from './MessageHead'
import { MessageManger } from './MessageProvider'
import { headRobotIcon } from './styles/icons'
import { iOS } from './UserInput'

export default function Message(){
	const [ isAlert, setAlert ] = useState(false)
	const state = useContext(MessageManger)[2][0]
	const icon = state.hasOwnProperty('icon') ? state.icon : headRobotIcon
	
	return (
		<div style={iOS?{maxHeight:'86vh'}:null}  className='message-container'>
			<MessageHead state={{ ...state, icon }} />
			<MessageList mode={state.mode} isAlert={isAlert} />
			<UserInput mode={state.mode} icon={icon} isAlert={isAlert} setAlert={setAlert} />
		</div>
	)
}
