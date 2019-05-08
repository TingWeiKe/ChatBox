import React, { useContext } from 'react'
import { Message, Button } from 'semantic-ui-react'
import { MessageManger } from './MessageProvider'

export default function Dimmer(props){
	const messageDispatch = useContext(MessageManger)[3][1]
	const setDimmer = props.setDimmer
	let dim = props.is_dim ? { display: 'block' } : { display: 'none' }

	function handleCleanHistory(){
		messageDispatch({ type: 'DELETE_MSG',mode:`${props.mode}Message` })
		localStorage.removeItem('message')
		localStorage.removeItem('user_id')
		setDimmer(false)
	}
	
	return (
		<div>
			<div style={dim} id='dimmer' onClick={() => setDimmer(false)} />
			<Message style={dim} className='dimmer_box' warning>
				<Message.Header>Delete all {props.title} Message history ?</Message.Header>
				<Button primary icon={'check'} content={'Yes'} onClick={handleCleanHistory} />
				<Button secondary icon={'x'} content={'Cancel'} onClick={()=>{setDimmer(false)}}/>
			</Message>
		</div>
	)
}
