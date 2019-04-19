import React from 'react'
import { Image } from 'semantic-ui-react'
import { robotIcon, headRobotIcon } from './styles/icons'

export default function SideList(){
	return (
		<div className='sidelist'>
			<div className='side_header'>Header</div>
			<div onMouseDown={console.log('QQ')} className='side_box'>
				<Image src={headRobotIcon} />
				<div className='robot_box'>
					<div>English Chatbot</div>
					<p>d</p>
				</div>
			</div>
			<div className='side_box'>
				<Image src={headRobotIcon} />
				<div className='robot_box'>
					<div>繁體中文聊天機器人</div>
					<p>( Traditional Chinese Chatbot )</p>
				</div>
			</div>
			<div className='side_box'>
				<Image src={headRobotIcon} />
				<div className='robot_box'>
					<div>StackOverFlow Chatbot</div>
					<p>d</p>
				</div>
			</div>
			<div className='footer'>Footer</div>
		</div>
	)
}
