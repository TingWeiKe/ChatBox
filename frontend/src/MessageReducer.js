export default function messageReducer(state, action){
	switch (action.type) {
		case 'mix':
			state = { ...state }
			state.mixMessage.push(action.message)
			localStorage.setItem('message', JSON.stringify({ ...state }))
			return state
		case 'en':
			state = { ...state }
			state.enMessage.push(action.message)
			localStorage.setItem('message', JSON.stringify({ ...state }))
			return state
		case 'cn':
			state = { ...state }
			state.cnMessage.push(action.message)
			localStorage.setItem('message', JSON.stringify({ ...state }))
			return state
		case 'stof':
			state = { ...state }
			state.stofMessage.push(action.message)
			
			return state
		case 'INIT':
			return (state = { mixMessage: [], enMessage: [], cnMessage: [], stofMessage: [] })
		case 'DELETE_MSG':
			state = {...state}
			state[action.mode] = []
			localStorage.setItem('message', JSON.stringify({ ...state }))
			return state
		case 'DELETE_ITEM':
		state = {...state}
		state[action.mode].splice(action.index,1)
		localStorage.setItem('message', JSON.stringify({ ...state }))
			return state
		default:
			return state
	}
}
