import React from 'react'
import { Form, TextArea, Image } from 'semantic-ui-react'
import {enterIcon} from './styles/enterIcon'
export default function UserInput(){
	return (
		<div className='user-input'>
			<input className='textarea' type='text' />
			<i className='submit'><Image className='enterIcon' src={enterIcon}></Image></i>
      
		</div>
	)
}
