import React from 'react'
import axios from 'axios'
import { useState, useContext } from 'react'
import { Image } from 'semantic-ui-react'
import { enterIcon } from './styles/icons'
import { MessageManger } from './MessageProvider'
import AlertMessage from './AlertMessage'

export default function UserInput(props){
	const [ input, setInput ] = useContext(MessageManger)
	const [ isReturned, setReturn ] = useState(true)
	const [ isAlert, setAlert ] = useState(false)
	const [ text, setText ] = useState('')
	// const [ counter, setcounter ] = useState(1)
	const counter = React.useRef(0)
	const dispatch = useContext(MessageManger)[3][1]
	const messageList = document.getElementById('message-list')

	function generateRandId(){
		return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
	}

	async function handleKeyDown(e){
		function isIputExist(){
			return input.length - counter.current > 0
		}

		function handlePreviosInput(index){
			console.log(index)
			if (index >= 0 && input.length - index > 0) {
				let targetDom = document.getElementById('textarea')
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
			let res = await axios.post('http://localhost:8000/api/', {
				text: text,
				mode: props.mode,
			})
			if (res.status === 200) {
				return res
			}
		}
	}

	function init(){
		messageList.scrollTop = messageList.scrollHeight
		setReturn(true)
		setAlert(false)
	}

	async function updateMessage(text){
		if (isReturned !== true && text !== '') {
			setAlert(true)
			return
		}
		if (text) {
			let x = {
				text: text,
				type: 'user',
				time: new Date().toLocaleString(),
				id: generateRandId(),
			}
			await setInput([ ...input, x ])
			await dispatch({
				type: props.mode,
				message: x,
			})
			document.getElementById('textarea').value = ''
			messageList.scrollTop = messageList.scrollHeight
			let res = await getAnswer(text)
			if (res.status === 200 && isAlert === false) {
				let y = {
					text: res.data.result,
					type: 'robot',
					time: new Date().toLocaleString(),
					id: res.data.id,
				}
				setText('')
				await dispatch({ type: props.mode, message: y })
				init()
			}
		}
	}

	return (
		<div className='user-input'>
			<input id='textarea' type='text' placeholder='Type your message...' onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setText(e.target.value)} />
			<i onClick={() => updateMessage(text)} className='submit'>
				<Image className='enterIcon' src={enterIcon} />
			</i>
			<AlertMessage setReturn={setReturn} isAlert={isAlert} />
		</div>
	)
}
