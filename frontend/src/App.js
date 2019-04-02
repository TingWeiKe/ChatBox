import React from 'react'
import { Grid } from 'semantic-ui-react'
import './styles/main.scss'
import SideList from './SideList'
import Message from './Message'
import ResultProvider from './ResultProvider'

export default function App(){
	return (
		<ResultProvider>
			<div className='App'>
				<Grid >
					<Grid.Row>
						<Grid.Column width={5} only='computer'>
							<SideList />
						</Grid.Column>
						<Grid.Column width={16} computer={11}>
							<Message />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		</ResultProvider>
	)
}
