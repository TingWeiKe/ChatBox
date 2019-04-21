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
	const [ text, setText ] = useState(null)
	const dispatch = useContext(MessageManger)[3][1]
	const messageList = document.getElementById('message-list')

	function generateRandId(){
		return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
	}

	function handleKeyDown(e){
		if (e.keyCode === 13) {
			updateMessage(text)
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
		setText('')
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
