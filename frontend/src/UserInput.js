import React from 'react'
import axios from 'axios'
import { useState, useContext } from 'react'
import { Image } from 'semantic-ui-react'
import { enterIcon } from './styles/icons'
import { ResultManger, InputManger } from './ResultProvider'
import AlertMessage from './AlertMessage'

export default function UserInput(){
	const [ result, setResult ] = useContext(ResultManger)
	const [ input, setInput ] = useContext(InputManger)
	const [ isReturned, setReturn ] = useState(true)
	const [ isAlert, setAlert ] = useState(false)
	const [ text, setText ] = useState(null)
	let m = document.getElementById('message-list')

	axios.interceptors.request.use(
		(request) => {
			setReturn(false)
			return request
		},
		(error) => {
			return Promise.reject(error)
		}
	)

	axios.interceptors.response.use(
		(response) => {
			setReturn(true)
			return response
		},
		(error) => {
			setReturn(true)
			return Promise.reject(error)
		}
	)

	function handleKeyDown(e){
		if (e.keyCode === 13) {
			updateMessage(text)
		}
	}

	async function getAnswer(text){
		if (text) {
			let m = await axios.post('http://localhost:8000/api/',  { text: text,mode:'cn' })
			if (m.status === 200) {
				return m
			}
		}
	}

	function init(){
		m.scrollTop = m.scrollHeight
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
			let x = { text: text, time: new Date().toLocaleString() }
			await setInput([ ...input, x ])
			document.getElementById('textarea').value = ''
			m.scrollTop = m.scrollHeight
			let res = await getAnswer(text)
			if (res.status === 200 && isAlert === false) {
				let y = { result: res.data.result, time: new Date().toLocaleString() }
				await setResult([ ...result, y ])
				init()
			}
		}
	}

	return (
		<div className='user-input'>
			<input id='textarea' type='text' onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setText(e.target.value)} />
			<i onClick={() => updateMessage(text)} className='submit'>
				<Image className='enterIcon' src={enterIcon} />
			</i>
			<AlertMessage isAlert={isAlert} />
		</div>
	)
}
