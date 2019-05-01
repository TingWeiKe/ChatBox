import React from 'react'
import { Grid, Responsive } from 'semantic-ui-react'
import './styles/main.scss'
import RobotList from './RobotList'
import Message from './Message'
import MessageProvider from './MessageProvider'
import InfoBox from './InfoBox'

export default function App(){
	return (
		<MessageProvider>
			<div className='App'>
				<Grid stretched={true} stackable={true}>

				
					<Responsive as={Grid.Row} maxWidth={1199} minWidth={768}>
						<InfoBox/>
					</Responsive>

					<Grid.Row>
					
						
						<Grid.Column widescreen={4}  largeScreen={4} computer={6} tablet={7}>
							<RobotList />
						</Grid.Column>
						<Responsive as={InfoBox} maxWidth={768}/>
						<Grid.Column widescreen={8}  largeScreen={8} computer={10} tablet={9}>
							<Message />
						</Grid.Column>
						<Responsive as={InfoBox} minWidth={1200}>
						</Responsive>
					</Grid.Row>
				</Grid>
			</div>
		</MessageProvider>
	)
}
