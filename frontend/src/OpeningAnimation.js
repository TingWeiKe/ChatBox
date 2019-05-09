import React, { useState } from 'react'
import { Image, Transition, Button } from 'semantic-ui-react'
import chickBot from './styles/chickbot.png'

export default function OpeningAnimation(props){
	const [ IsComplete, setIsComplete ] = useState(false)
  const [ buttonClciked, setButtonClciked ] = useState(false)
  
  function handleStarted() {
    props.setIsStarted(true)
    document.getElementById('opening').style.display='none'
  }

  function handleButtonClick() {
    setIsComplete(false)
    setButtonClciked(true)
  }

	return (
		<div id='opening'>
			<Transition onComplete={() => setIsComplete(true)} onHide={handleStarted} transitionOnMount={true} visible={!props.IsStarted&&!buttonClciked} animation='scale' duration={600}>
				<div>
					<Image id='main_img' src={chickBot} />
					<h1>ChatBox</h1>
				</div>
			</Transition>
			<Transition visible={IsComplete && !buttonClciked} animation='slide up' duration={600}>
				<div id='main_button' onClick={handleButtonClick}>
					Start Chat
				</div>
			</Transition>
		</div>
	)
}
