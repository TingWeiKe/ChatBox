import React, { useState } from 'react'
import { headRobotIcon, chineseIcon, stIcon } from './styles/icons'
import RobotItem from './RobotItem'

export default function SideList(){
	const initialState = [
		{
			title: 'English Chatbot',
			info: 'English Chatbot',
			action: 'TO_EN',
			mode: 'en',
			icon: headRobotIcon,
		},
		{
			title: '中文聊天機器人',
			info: '( Chinese Chatbot )',
			action: 'TO_CN',
			mode: 'en',
			icon: chineseIcon,
		},
		{
			title: 'StackOverFlowBot',
			info: '( StackOverFlow Chatbot )',
			action: 'TO_STOF',
			mode: 'stof',
			icon: stIcon,
		},
	]
	const [ robots ] = useState(initialState)

	return (
		<div className='sidelist'>
			<div className='side_header'>
			<div>ChatBox <span role="img" aria-label="Robot">🤖🤖</span> </div>
			<div>Chatting with a Deep learning brain</div>
			
			</div>
			{robots ? (
				robots.map((data) => {
					return <RobotItem data={data} />
				})
			) : null}

		</div>
	)
}
