import React from 'react'
import { Grid, Divider, Image, Header } from 'semantic-ui-react'
import { gitIcon } from './styles/icons'
import chickBot from './styles/chickbot.png'

export default function InfoBox(){
	return (
		<Grid.Column tablet={16} widescreen={4} largeScreen={4}>
			<div className='info_box'>
				<div style={{ margin: 'auto' }}>
					<Image id='info_msg' src={chickBot} />
					<h1>ChatBox</h1>
				</div>
				<Divider />
				<div>
				Chatting with a Deep learning brains.<br/>
				A fancy chatroom for you to chat with a functional DL robot.
				</div>

			
				<div>
					<div className='git'>
						<Divider />
						<a href='https://github.com/TIngWeiKe/ChatBox' target='_blank' rel='noopener noreferrer'>
							<div className='github_box clickable'>
								<Header as='h3'>
									<Image src={gitIcon} />
									<Header.Content>
										FullStack
										<Header.Subheader>See Github</Header.Subheader>
									</Header.Content>
								</Header>
							</div>
						</a>
						<a href='https://github.com/waynewu6250/StackBoxer' target='_blank' rel='noopener noreferrer'>
							<div className='github_box clickable'>
								<Header as='h3'>
									<Image src={gitIcon} />
									<Header.Content>
										DL Models
										<Header.Subheader>See Github</Header.Subheader>
									</Header.Content>
								</Header>
							</div>
						</a>
					</div>
				</div>
			</div>
		</Grid.Column>
	)
}
