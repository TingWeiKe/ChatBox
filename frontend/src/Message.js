import React from 'react'
import MessageList from './MessageList'
import UserInput from './UserInput'
import { Grid, Image, Segment } from 'semantic-ui-react'
export default function Message(){
	return (
		<div className='message-container'>

				<MessageList />
			<UserInput />
		</div>
	)
}
