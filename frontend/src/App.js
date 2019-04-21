import React from 'react'
import { Grid } from 'semantic-ui-react'
import './styles/main.scss'
import SideList from './SideList'
import Message from './Message'
import MessageProvider from './MessageProvider'

export default function App(){
	return (
		<MessageProvider>
			<div className='App'>
				<Grid stretched={true} stackable={true}>
					<Grid.Row>
						<Grid.Column width={6} >
							<SideList />
						</Grid.Column>
						<Grid.Column width={10}>
							<Message />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		</MessageProvider>
	)
}
