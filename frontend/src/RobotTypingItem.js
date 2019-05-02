import React from 'react'
import axios from 'axios'
import { Image } from 'semantic-ui-react'
let typingTimeout

axios.interceptors.request.use(
	(request) => {
		typingTimeout = setTimeout(() => {
			document.getElementById('typing').style.display = 'unset'
			document.getElementById('message-list').scrollTop = document.getElementById('message-list').scrollHeight
		}, 1500)

		return request
	},
	(error) => {
		clearTimeout(typingTimeout)
		document.getElementById('typing').style.display = 'none'

		return Promise.reject(error)
	}
)
axios.interceptors.response.use(
	(response) => {
		clearTimeout(typingTimeout)
		document.getElementById('typing').style.display = 'none'

		return response
	},
	(error) => {
		clearTimeout(typingTimeout)
		document.getElementById('typing').style.display = 'none'

		return Promise.reject(error)
	}
)

export default function RobotTypingItem(props){
	return (
		<div id='typing' style={{ display: 'none' }} className='robot-message'>
			<div className='msg_icon'>
				<Image className='circle' src={props.icon} />
			</div>
			<div className='msg_cont'>
				<div id='wave'>
					<span className='dot' />
					<span className='dot' />
					<span className='dot' />
				</div>
			</div>
		</div>
	)
}
