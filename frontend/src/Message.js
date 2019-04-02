import React from 'react'
import MessageList from './MessageList'
import UserInput from './UserInput'
export default function Message(){
	return (
		<div className='message-container'>
			<UserInput />
			<MessageList />
		</div>
	)
}
