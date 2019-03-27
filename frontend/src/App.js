import React from 'react'
import axios from 'axios'
import Linkify from 'react-linkify'
import { useState, useEffect } from 'react'
import './styles/main.scss';
import SideList from './SideList'

export default function App(){
	const [ result, setResult ] = useState('result')
	const [ text, setText ] = useState(null)

	function handleKeyDown(e){
		if (e.keyCode === 13) {
			getSnswer(text)
		}
	}

	async function getSnswer(text){
		if (text) {
			const res = await axios.post('http://127.0.0.1:8000/api/', { text: text })
			setResult(res.data.result)
			console.log(res)
		}
	}

	return (
		<div className='App'>
			<input type='text' onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setText(e.target.value)} />
			<div>
				<button onClick={() => getSnswer(text)}>Submit</button>
				<Linkify>
					<h3>{result}</h3>
				</Linkify>
			</div>
		</div>
	)
}
