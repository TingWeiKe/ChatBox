import React, { useContext } from 'react'
import MessageItem from './MessageItem'
import { MessageManger } from './MessageProvider'

export default function MessageList(props){
	const [ robotState ] = useContext(MessageManger)[2]
	const [ state ] = useContext(MessageManger)[3]
	let message = []
	let x = [ state.mixMessage,state.enMessage, state.cnMessage, state.stMessage ]
	message = x[robotState.index]
	
	return (
		<div id='message-list'>
			{message ? (
				message.map((data) => {
					return (
						<div key={data.id}>
							<MessageItem type={data.type} data={data.text} time={data.time} icon={robotState.icon} />
						</div>
					)
				})
			) : null}
		</div>
	)
}
