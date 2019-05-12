import React, { useContext, useState, useEffect, useRef } from 'react'
import Linkify from 'react-linkify'
import { userIcon } from './styles/icons'
import { Image } from 'semantic-ui-react'
import { Transition } from 'semantic-ui-react'
import { MessageManger } from './MessageProvider'

function MessageRobotItem(props){
	// ref = HTML DOM <div className='msg_icon'>
	const ref = useRef()
	let contentPressTimer;

  function handleContentPress() {
    contentPressTimer = setTimeout(() => props.setToggle(!props.toggle), 800);
  }

  function handleContentRelease() {
    clearTimeout(contentPressTimer);
  }

	const handleClickOutside = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			props.setToggle(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	})

	return (
		<Transition key={props.key} transitionOnMount={true} animation='scale' duration={400}>
			<div className='robot-message'>
				<div ref={ref} className='msg_icon'>
					<Image className='circle clickable' src={props.icon} onClick={() => props.setToggle(!props.toggle)} />
				</div>
				
				<div className='msg_cont' onTouchStart={handleContentPress}  onTouchEnd={handleContentRelease}>
					<Linkify>{props.props.data}</Linkify>
				</div>
				<div style={props.toggle ? { display: 'unset' } : { display: 'none' }} className='robot_dropdown' onClick={() => props.handleDeleteMsg(props.props.index, props.robotState.mode)}>
					Delete
				</div>
				<div className='msg_time'>{props.props.time}</div>
			</div>
		</Transition>
	)
}

function MessageUserItem(props){
	const ref = useRef()
	let contentPressTimer;
	
	const handleClickOutside = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			props.setToggle(false)
		}
	}

	function handleContentPress() {
    contentPressTimer = setTimeout(() => props.setToggle(!props.toggle), 800);
  }

  function handleContentRelease() {
    clearTimeout(contentPressTimer);
  }

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	})

	return (
		<Transition key={props.key} transitionOnMount={true} animation='scale' duration={400}>
			<div className='user-message'>
				<div ref={ref}  className='msg_icon'>
					<Image className='circle clickable' src={userIcon} onClick={() => props.setToggle(!props.toggle)} />
				</div>
				<div className='msg_cont' onTouchStart={handleContentPress}  onTouchEnd={handleContentRelease}>
					<Linkify>{props.props.data}</Linkify>
				</div>
				<div style={props.toggle ? { display: 'unset' } : { display: 'none' }} className='user_dropdown' onClick={() => props.handleDeleteMsg(props.props.index, props.robotState.mode)}>
						Delete
				</div>
				<div className='msg_time'>{props.props.time}</div>
			</div>
		</Transition>
	)
}

export default function MessageItem(props){
	const messageDispatch = useContext(MessageManger)[3][1]
	const [ robotState ] = useContext(MessageManger)[2]
	const [ toggle, setToggle ] = useState(false)

	function handleDeleteMsg(index, mode){
		messageDispatch({ type: 'DELETE_ITEM', index: index, mode: `${mode}Message` })
	}

	const icon = props.icon
	return props.type === 'user' ?
	 <MessageUserItem  
		props={props} 
		toggle={toggle} 
		messageDispatch={messageDispatch} 
		handleDeleteMsg={handleDeleteMsg} 
		setToggle={setToggle} 
		robotState={robotState}  
	 /> : 
	 <MessageRobotItem 
		props={props} 
		icon={icon} 
		toggle={toggle} 
		messageDispatch={messageDispatch} 
		handleDeleteMsg={handleDeleteMsg} 
		setToggle={setToggle} 
		robotState={robotState} 
	/>
}
