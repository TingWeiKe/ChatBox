import React from 'react'
import Linkify from 'react-linkify'
import { robotIcon } from './styles/icons'
import { Image } from 'semantic-ui-react'

export default function MessageItem(props){
	console.log(props)

	return (
		<div className='message'>
			<div className='msg_icon'>
				<Image src={robotIcon} />
			</div>

				<Linkify className='msg_cont'>{props.data}</Linkify>
				<div className='msg_time' >9:00 AM, Today</div>


		</div>
	)
}
