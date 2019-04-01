import React from 'react'
import Linkify from 'react-linkify'
import { robotIcon, useIcon } from './styles/icons'
import { Image } from 'semantic-ui-react'


function MessageRobotItem(props){
	return (
		<div className='robot-message'>
			<div className='msg_icon'>
				<Image src={robotIcon} />
			</div>
			<div className='msg_cont'>
				<Linkify>{props.props.data}</Linkify>
			</div>
			<div className='msg_time'>9:00 AM, Today</div>
		</div>
	)
}

function MessageUserItem(props){
	return (
		<div className='user-message'>
    <div className='msg_icon'>
				<Image src={useIcon} />
			</div>
			<div className='msg_cont'>
				<Linkify>{props.props.data}</Linkify>
			</div>
			<div className='msg_time'>9:00 AM, Today</div>
		</div>
	)
}

export default function MessageItem(props){
	console.log(props)
  
	return <MessageUserItem props={props} />
}
