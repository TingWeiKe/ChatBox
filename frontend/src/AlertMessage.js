import React from 'react'
import { Message, Transition } from 'semantic-ui-react'
import axios from 'axios'

export default function AlertMessage(props){
	axios.interceptors.request.use(
		(request) => {
			props.setReturn(false)
			return request
		},
		(error) => {
			return Promise.reject(error)
		}
	)
	axios.interceptors.response.use(
		(response) => {
			props.setReturn(true)
			return response
		},
		(error) => {
			props.setReturn(true)
			return Promise.reject(error)
		}
	)

	return (
		<Transition visible={props.isAlert} animation='scale' duration={500}>
			<Message id='alert' negative size='big'>
				<Message.Header>You must wait for the Robot!</Message.Header>
			</Message>
		</Transition>
	)
}
