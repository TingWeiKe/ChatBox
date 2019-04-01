import React from 'react'
import { Message, Transition } from 'semantic-ui-react'
export default function AlertMessage(props){
	return (
		<Transition visible={props.isAlert} animation='scale' duration={200}>
			<Message id='alert' warning>
				<Message.Header>You must register before you can do that!</Message.Header>
				<p>Visit our registration page, then try again.</p>
			</Message>
		</Transition>
	)
}
