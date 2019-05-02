import React from 'react'
import Linkify from 'react-linkify'
import { userIcon } from './styles/icons'
import { Image } from 'semantic-ui-react'
import { Transition } from 'semantic-ui-react'

function MessageRobotItem(props){
	return (
		<Transition transitionOnMount={true} animation='scale' duration={400}>
			<div className='robot-message'>
				<div className='msg_icon'>
					<Image className='circle' src={props.icon} />
				</div>
				<div className='msg_cont'>
					<Linkify>{props.props.data}</Linkify>
				</div>
				<div className='msg_time'>{props.props.time}</div>
			</div>
		</Transition>
	)
}

function MessageUserItem(props){
	return (
		<Transition transitionOnMount={true} animation='scale' duration={400}>
			<div className='user-message'>
				<div className='msg_icon'>
					<Image className='circle' src={userIcon} />
				</div>
				<div className='msg_cont'>
					<Linkify>{props.props.data}</Linkify>
				</div>
				<div className='msg_time'>{props.props.time}</div>
			</div>
		</Transition>
	)
}

export default function MessageItem(props){
	const icon = props.icon
	return props.type === 'user' ? <MessageUserItem props={props} /> : <MessageRobotItem props={props} icon={icon} />
}
