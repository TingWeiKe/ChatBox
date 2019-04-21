import React from 'react'
import { Image } from 'semantic-ui-react'

export default function MessageHead(props){
	return (
		<div className='msg_head'>
			<div>
				<Image src={props.state.icon} />
				<span className='online_icon' />
			</div>

			<div className='robot_info'>
				<span>{props.state.title}</span>
				<div>{props.state.info}</div>
			</div>
		</div>
	)
}
