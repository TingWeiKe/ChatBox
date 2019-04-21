import React, { useContext } from 'react'
import MessageList from './MessageList'
import UserInput from './UserInput'
import MessageHead from './MessageHead'
import { MessageManger } from './MessageProvider'
import { headRobotIcon } from './styles/icons'

export default function Message(){
	const state= useContext(MessageManger)[2][0]
	let icon = state.hasOwnProperty('icon') ? state.icon : headRobotIcon
	return (
		<div className='message-container'>
			<MessageHead state={{...state,icon}} />
			<MessageList mode={state.mode} />
			<UserInput mode={state.mode} icon={icon} />
		</div>
	)
}
