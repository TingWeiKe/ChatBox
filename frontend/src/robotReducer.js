

export default function robotReducer(state, action){

	switch (action.type) {
		case 'TO_EN':
			return state= { ...state,...action.data, mode: 'en',index:0}
		case 'TO_CN':
			return state=  { ...state,...action.data, mode: 'cn',index:1}
		case 'TO_STOF':
			return state= { ...state,...action.data, mode: 'stof',index:2 }
		default:
			return state
	}
}


