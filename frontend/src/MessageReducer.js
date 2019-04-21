export default function messageReducer(state, action){
	switch (action.type) {
		case 'en':
			state = { ...state }
			state.enMessage.push(action.message)
			return state
		case 'cn':
			state = { ...state }
			state.cnMessage.push(action.message)

			return state
		case 'stof':
			state = { ...state }
			state.stMessage.push(action.message)

			return state
		default:
			return state
	}
}
