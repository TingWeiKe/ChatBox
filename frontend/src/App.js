import React from 'react'
import axios from 'axios'
import Linkify from 'react-linkify'
import { useState, useEffect } from 'react'
import { Grid, Image } from 'semantic-ui-react'
import './styles/main.scss'
import SideList from './SideList'
import Message from './Message'

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
			<Grid stackable={true}>
				<Grid.Row>
					<Grid.Column width={5}>
						<SideList />
					</Grid.Column>
					<Grid.Column width={11}>
						<Message/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			{/* <input type='text' onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setText(e.target.value)} />
			<div>
				<button onClick={() => getSnswer(text)}>Submit</button>
				<Linkify>
					<h3>{result}</h3>
				</Linkify>
			</div> */}
		</div>
	)
}
