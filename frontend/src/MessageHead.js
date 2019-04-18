import React from 'react'
import { Image } from 'semantic-ui-react'
import { robotIcon, headRobotIcon } from './styles/icons'
export default function MessageHead() {
  return (
    <div className='msg_head'>
    <Image src={headRobotIcon} />
      <div className='robot_info'>
        <span>中文聊天機器人 Chinese Chatbot</span>
        <div>(繁體中文)</div>
      </div>
    </div>
  )
}
