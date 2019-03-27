import React, { Component } from 'react'
import Axios from 'axios'
import Linkify from 'react-linkify'
class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			input: '',
			result: 'Result',
		}
  }
  
  getAnswer(){
    Axios({
			method: 'post',
			url: 'http://127.0.0.1:8000/api/',
			data: {
        text: this.state.input,
				user_id: 'rockmanx',
			},
		}).then((data) => {
      console.log(data)
      this.setState({ result: data.data.result })
		})
  }

	hanldeInput(e) {
		this.setState({ input: e.target.value })
		console.log(this.state.input)
	}

	handleSubmit() {
		this.getAnswer()
	}

	handleKeyDown(e) {
		if (e.keyCode === 13) {
      this.getAnswer()
		}
	}

	render() {
		return (
			<div className='App'>
				<input type='text' onKeyDown={(e) => this.handleKeyDown(e)} onChange={(e) => this.hanldeInput(e)} />
				<div>
					<button onClick={() => this.handleSubmit()}>Submit</button>
					<Linkify>
						<h3>{this.state.result}</h3>
					</Linkify>
				</div>
			</div>
		)
	}
}

export default App
