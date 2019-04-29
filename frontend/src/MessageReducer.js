const initMessageState = {mixMessage:[],enMessage:[],cnMessage:[] ,stMessage:[]  }
export default function messageReducer(state=initMessageState, action){
	switch (action.type) {
		case 'mix':
			state = { ...state }
			state.mixMessage.push(action.message)
			localStorage.setItem('message', JSON.stringify({...state,...action.message}))
			return state
		case 'en':
			state = { ...state }
			state.enMessage.push(action.message)
			localStorage.setItem('message', JSON.stringify({...state,...action.message}))
			return state
		case 'cn':
			state = { ...state }
			state.cnMessage.push(action.message)
			localStorage.setItem('message', JSON.stringify({...state,...action.message}))
			return state
		case 'stof':
			state = { ...state }
			state.stMessage.push(action.message)
			localStorage.setItem('message', JSON.stringify({...state,...action.message}))
			return state
		default:
			return state
	}
}
