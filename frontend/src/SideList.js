import React, { useState } from 'react'
import { headRobotIcon, chineseIcon, stIcon, mixRobotIcon } from './styles/icons'
import RobotItem from './RobotItem'

export default function SideList(){
	const initialState = [
		{
			title: 'MixRobot',
			info: '( EnglishBot + StackBot )',
			action: 'TO_MIX',
			mode: 'mix',
			icon: mixRobotIcon,
		},
		{
			title: 'English Chatbot',
			info: '( English Chatbot )',
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
			title: 'StackBot',
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
				<div id='header'>
					ChatBox{' '}
					<span role='img' aria-label='Robot'>
						🤖🤖
					</span>{' '}
				</div>
				<div id='sub_header'>Chatting with a Deep learning brain</div>
			</div>
			{robots ? (
				robots.map((data) => {
					return <RobotItem key={data.title} data={data} />
				})
			) : null}
		</div>
	)
}
