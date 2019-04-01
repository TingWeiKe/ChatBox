import React from 'react'
import Linkify from 'react-linkify'
export default function MessageItem(props) {
  console.log(props);
  
  return (
    <div key={props.id} className='message'>
      <Linkify>{props.data}</Linkify>
    </div>
  )
}
