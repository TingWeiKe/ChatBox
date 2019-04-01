import React from 'react'
import Linkify from 'react-linkify'
import { Grid, Image } from 'semantic-ui-react'
import './styles/main.scss'
import SideList from './SideList'
import Message from './Message'
import ResultProvider from './ResultProvider'
export default function App(){


	return (
		<ResultProvider>
		<div className='App'>
			<Grid stackable={true}>
				<Grid.Row>
					<Grid.Column width={5}>
						<SideList />
					</Grid.Column>
					<Grid.Column width={11}>
						<Message/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</div>
		</ResultProvider>
	)
}
