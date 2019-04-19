import React from 'react'
import { Image } from 'semantic-ui-react'
import { robotIcon, headRobotIcon } from './styles/icons'
export default function MessageHead() {
  return (
    <div className='msg_head'>
    <Image src={headRobotIcon} />
      <div className='robot_info'>
        <span>繁體中文聊天機器人</span>
        <div>( Traditional Chinese Chatbot )</div>
      </div>
    </div>
  )
}
