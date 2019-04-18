import React from 'react'
import MessageList from './MessageList'
import UserInput from './UserInput'
import MessageHead from './MessageHead'

export default function Message(){
	return (
		<div className='message-container'>
			<MessageHead />
			<MessageList />
			<UserInput />
		</div>
	)
}
