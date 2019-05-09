import React, { useState } from 'react'
import { Grid, Responsive, Transition } from 'semantic-ui-react'
import './styles/main.scss'
import RobotList from './RobotList'
import Message from './Message'
import MessageProvider from './MessageProvider'
import InfoBox from './InfoBox'
import OpeningAnimation from './OpeningAnimation'

export default function App(){
	const [ IsStarted, setIsStarted ] = useState(false)
	return (
		<MessageProvider>
			<div className='App'>
				<OpeningAnimation setIsStarted={setIsStarted} IsStarted={IsStarted} />
				<Transition visible={IsStarted} animation='fade up' duration={1000}>
					<Grid stretched={true} stackable={true}>
						<Responsive as={Grid.Row} maxWidth={1199} minWidth={768}>
							<InfoBox />
						</Responsive>
						<Grid.Row>
							<Grid.Column widescreen={4} largeScreen={4} computer={6} tablet={7}>
								<RobotList />
							</Grid.Column>
							<Responsive as={InfoBox} maxWidth={768} />
							<Grid.Column widescreen={8} largeScreen={8} computer={10} tablet={9}>
								<Message />
							</Grid.Column>
							<Responsive as={InfoBox} minWidth={1200} />
						</Grid.Row>
					</Grid>
				</Transition>
			</div>
		</MessageProvider>
	)
}
