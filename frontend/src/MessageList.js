import React, { useContext, useEffect } from 'react'
import MessageItem from './MessageItem'
import { MessageManger } from './MessageProvider'

export default function MessageList(props){
	const [ robotState ] = useContext(MessageManger)[2]
	const [ messageState ] = useContext(MessageManger)[3]
	let message = []
	let x = [ messageState.mixMessage, messageState.enMessage, messageState.cnMessage, messageState.stMessage ]
	message = x[robotState.index]
	
	function scrollToBottom(){
		document.getElementById('message-list').scrollTop = document.getElementById('message-list').scrollHeight
	}

	useEffect(() => {
		scrollToBottom()
		return () => {
			scrollToBottom()
		}
	}, x)

	return (
		<div onLoad={() => scrollToBottom()} id='message-list'>
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
