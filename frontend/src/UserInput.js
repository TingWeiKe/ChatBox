import React from 'react'
import axios from 'axios'
import { useState, useContext,useEffect} from 'react'
import { Image } from 'semantic-ui-react'
import { enterIcon } from './styles/icons'
import { MessageManger } from './MessageProvider'
import AlertMessage from './AlertMessage'
import send from './sound/send.mp3'
import receive from './sound/receive.mp3'
const sendSound = new Audio(send)
const receiveSound = new Audio(receive)

export default function UserInput(props){
	const [ input, setInput ] = useContext(MessageManger)
	const [ isReturned, setReturn ] = useState(true)
	const [ isAlert, setAlert ] = useState(false)
	const [ text, setText ] = useState('')
	// const [ counter, setcounter ] = useState(1)
	const counter = React.useRef(0)
	const dispatch = useContext(MessageManger)[3][1]
	const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
	function generateRandId(){
		return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
	}

	async function handleKeyDown(e){
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
		if (text) {
			let res = await axios.post('http://127.0.0.1:8000/api/', {
				text: text,
				mode: props.mode,
			})
			if (res.status === 200) {
				return res
			}
		}
	}

	function init(){
		setReturn(true)
		setAlert(false)
	}

	async function updateMessage(text){
		// Wait for the robot
		if (isReturned !== true && text !== '') {
			setAlert(true)
			return
		}
		// Input is not Empty
		if (text) {
			document.getElementById('textarea').value = ''
			let inputMessage = {
				text: text,
				type: 'user',
				time: new Date().toLocaleString(),
				id: generateRandId(),
			}
			sendSound.play()
			await setInput([ ...input, inputMessage ])
			await dispatch({
				type: props.mode,
				message: inputMessage,
			})
			// Send Request
			let res = await getAnswer(text)
			// request success with status code 200
			if (res.status === 200 && isAlert === false) {
				let outputMessage = {
					text: res.data.result,
					type: 'robot',
					time: new Date().toLocaleString(),
					id: res.data.id,
				}
				await dispatch({
					type: props.mode,
					message: outputMessage,
				})
				sendSound.pause()
				if(!iOS){
					receiveSound.play()
				}
				sendSound.load()
				setText('')
				init()
			}
		}
	}

	return (
		<div className='user-input'>
				{console.log('QQ')}
			<input id='textarea' type='text' placeholder='Type your message...' onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setText(e.target.value)} />
			<i onClick={() => updateMessage(text)} className='submit'>
				<Image className='enterIcon' src={enterIcon} />
			</i>
			<span id='playButton'></span>
			<AlertMessage setReturn={setReturn} isAlert={isAlert} />
			
		</div>
	)
}
