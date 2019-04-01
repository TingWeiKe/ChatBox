import React from 'react'
import axios from 'axios'

import { useState,  useContext } from 'react'
import { Image } from 'semantic-ui-react'
import { enterIcon } from './styles/icons'
import { ResultManger } from './ResultProvider'
import AlertMessage from './AlertMessage'
export default function UserInput(){
	const [ result, setResult ] = useContext(ResultManger)
	const [ isReturned, setReturn ] = useState(true)
	const [ isAlert, setAlert ] = useState(false)
	const [ text, setText ] = useState(null)
	//FIXME:

	axios.interceptors.request.use(
		(request) => {
			setReturn(false)
			return request
		},
		(error) => {
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
			let m = await axios.post('http://127.0.0.1:8000/api/', { text: text })
			if (m.status === 200) {
				return m
			}
		}
	}

	function init(){
		let m = document.getElementsByClassName('message-list')[0]
		m.scrollTop = m.scrollHeight
		setReturn(true)
		setAlert(false)
		setText('')
	}

	async function updateMessage(text){
		if (isReturned !== true && text != '') {
			setAlert(true)
			return
		}
		if (text) {
			document.getElementById('textarea').value = ''
			let res = await getAnswer(text)
			if (res.status === 200 && isAlert === false) {
				result.push(res.data.result)
				setResult([ ...result ])
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
