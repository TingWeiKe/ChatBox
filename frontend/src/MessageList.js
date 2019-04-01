import React, { useContext } from 'react'

import MessageItem from './MessageItem'
import { ResultManger } from './ResultProvider'

export default function MessageList(){
	return (
		<ResultManger.Consumer>
			{(result) => {
				console.log(result)
				let y = result[0]
					? result[0].map((x, index) => {
							return <MessageItem id={index} data={x} />
						})
					: null
				return <div className='message-list '>{y}</div>
      }}
      {}
		</ResultManger.Consumer>
	)
}
