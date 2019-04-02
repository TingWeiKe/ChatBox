import React, { useContext } from 'react'
import MessageItem from './MessageItem'
import { ResultManger, InputManger } from './ResultProvider'

export default function MessageList(){
	const [ result ] = useContext(ResultManger)
	const [ input ] = useContext(InputManger)

	return (
		<div id='message-list'>
		{console.log(result)
		}
			{input || result ? (
				input.map((data, index) => {
					return (
						<div key={index}>
							<MessageItem  type={'user'} data={data.text} time={data.time} />
							{result[index] !== undefined ? <MessageItem  type={'robt'} data={result[index].result} time={data.time} /> : null}
						</div>
					)
				})
			) : null}
		</div>
	)
}
