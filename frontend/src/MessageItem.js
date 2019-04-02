import React from 'react'
import Linkify from 'react-linkify'
import { robotIcon, useIcon } from './styles/icons'
import { Image } from 'semantic-ui-react'
import { Transition } from 'semantic-ui-react'

function MessageRobotItem(props){
	return (
		<Transition transitionOnMount={true} animation='scale' duration={300}>
			<div className='robot-message'>
				<div className='msg_icon'>
					<Image src={robotIcon} />
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
		<Transition transitionOnMount={true} animation='scale' duration={300}>
			<div className='user-message'>
				<div className='msg_icon'>
					<Image src={useIcon} />
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
	return props.type === 'user' ? <MessageUserItem props={props} /> : <MessageRobotItem props={props} />
}
