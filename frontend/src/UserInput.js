import React from 'react'
import axios from 'axios'
import { useState, useContext } from 'react'
import { Image } from 'semantic-ui-react'
import { enterIcon } from './styles/icons'
import { MessageManger } from './MessageProvider'
import send from './sound/send.mp3'
import receive from './sound/receive.mp3'
const sendSound = new Audio(send)
const receiveSound = new Audio(receive)

export default function UserInput(props){
	const [ input, setInput ] = useContext(MessageManger)
	const [ isReturned, setReturn ] = useState(true)
	const [ text, setText ] = useState('')
	const counter = React.useRef(0)
	const dispatch = useContext(MessageManger)[3][1]
	const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)

	function generateRandId(){
		return Math.random().toString(36).replace(/[^a-z]+/g, '')
	}

	function generateUserId(){
		if (typeof localStorage !== 'undefined') {
			if (!localStorage.user_id) {
				localStorage.setItem('user_id', generateRandId())
			}
		}
	}

	function handleKeyDown(e){
		function isIputExist(){
			return input.length - counter.current > 0
		}

		function handlePreviosInput(index){
			if (index >= 0 && input.length - index > 0) {
				document.getElementById('textarea').value = input[index].text
			}
		}

		//Enter  Button
		if (e.keyCode === 13) {
			updateMessage(e.target.value)
		}
		//Up Button
		if (e.keyCode === 38 && isIputExist()) {
			e.preventDefault()
			counter.current += 1
			let index = input.length - counter.current
			handlePreviosInput(index)
			//Down Button
		} else if (e.keyCode === 40 && counter.current > 1) {
			counter.current -= 1
			let index = input.length - counter.current
			handlePreviosInput(index)
			//if statement prevent previous loop
		} else if (e.keyCode !== 38 && e.keyCode !== 40) {
			counter.current = 0
		}
	}

	async function getAnswer(text){
		generateUserId()
		if (text) {
			let res = await axios.post('http://127.0.0.1:8000/api/', {
				text: text,
				user_id: localStorage.user_id,
				mode: props.mode,
			})
			return res
		}
	}

	function init(){
		setReturn(true)
		if (props.isAlert === true) {
			props.setAlert(false)
		}
	}

	async function updateMessage(text){
		// Alert 'Wait for the robot' message
		if (isReturned !== true && text !== '') {
			props.setAlert(true)
			setTimeout(() => {
				props.setAlert(false)
			}, 2500)
			return
		}
		// Input is not Empty
		if (text && isReturned === true) {
			setReturn(false)
			sendSound.play()
			document.getElementById('textarea').value = ''
			let inputMessage = {
				text: text,
				type: 'user',
				time: new Date().toLocaleString(),
				id: generateRandId(),
			}
			setInput([ ...input, inputMessage ])
			dispatch({
				type: props.mode,
				message: inputMessage,
			})
			// Send Request
			getAnswer(text).then(
				(res) => {
					// request success with status code 200
					if (res.status === 200) {
						let outputMessage = {
							text: res.data.result,
							type: 'robot',
							time: new Date().toLocaleString(),
							id: res.data.id,
						}
						dispatch({
							type: props.mode,
							message: outputMessage,
						})
						if (!iOS) {
							receiveSound.play()
						}
						setText('')
						sendSound.load()
						init()
					}
				},
				(error) => {
					setReturn(true)
				}
			)
		}
	}

	return (
		<div className='user-input'>
			<input id='textarea' type='text' placeholder='Type your message...' onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setText(e.target.value)} />
			<i onClick={() => updateMessage(text)} className='submit'>
				<Image className='enterIcon' src={enterIcon} />
			</i>
			<span id='playButton' />
		</div>
	)
}
