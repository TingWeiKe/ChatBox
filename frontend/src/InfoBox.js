import React from 'react'
import { Grid, Divider, Image, Header } from 'semantic-ui-react'
import { gitIcon } from './styles/icons'
import chickBot from './styles/chickbot.png'

export default function InfoBox(){
	return (
		<Grid.Column tablet={16} widescreen={4} largeScreen={4}>
			<div className='info_box'>
				<div style={{margin:'auto'}}>
					<Image id='info_msg' src={chickBot} />
					<h1>ChatBox</h1>
				</div>
				<Divider />
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				<div className='github_box'>
					<Header as='h3'>
						<Image src={gitIcon} />
						<Header.Content>FullStack
						<Header.Subheader>See the github</Header.Subheader>
						</Header.Content>
					</Header>
				</div>
			</div>
		</Grid.Column>
	)
}
