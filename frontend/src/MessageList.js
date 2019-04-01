import React, { useContext } from 'react'

import MessageItem from './MessageItem'
import { ResultManger } from './ResultProvider'

export default function MessageList(){
	console.log('QQ')
	return (
		<ResultManger.Consumer>
			{(result) => {
				let y = result[0]
					? result[0].map((x,index) => {
							//FIXME:
							console.log(index)
							return <MessageItem key={index} data={x} />
						})
					: null
				return <div className='message-list '>{y}</div>
			}}
		</ResultManger.Consumer>
	)
}
