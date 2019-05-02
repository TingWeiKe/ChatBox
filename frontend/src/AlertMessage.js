import React from 'react'
import { Message, Transition } from 'semantic-ui-react'

export default function AlertMessage(props){
	return (
		<Transition visible={props.isAlert} animation='scale' duration={400}>
			<Message id='alert' negative size='big'>
				<Message.Header>You must wait for the Robot!</Message.Header>
			</Message>
		</Transition>
	)
}
