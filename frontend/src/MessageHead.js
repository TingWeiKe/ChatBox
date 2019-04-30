import React, {useState} from 'react'
import { Image, Icon } from 'semantic-ui-react'
import Dimmer from './Dimmer'
export default function MessageHead(props){
	const [dimmerState, setDimmerState] = useState(false)
	
	function handleDimmer() {
		setDimmerState(true)
	}
	return (
		<div className='msg_head'>
			<Dimmer is_dim={dimmerState} setDimmer={setDimmerState} />
			<div className='robot_info'>
				<Image src={props.state.icon} />
				<span className='online_icon' />
			</div>
			<div className='robot_info'>
				<span>{props.state.title}</span>
				<div>{props.state.info}</div>
			</div>
			<div className='menu_btn'>
				<Icon onClick={()=>{handleDimmer()}} name='x' />
			</div>
		</div>
	)
}
