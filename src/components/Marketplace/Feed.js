import React, {useEffect} from 'react'
import { useStore } from '../../context/StorageContext'
import {useAuth} from '../../context/AuthContext'

export default function Feed() {
  const {getItems, items, expandItem} = useStore();
  const {user} = useAuth();

  useEffect(() => {
    getItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function Chat(obj){
    const chatUrl = "https://wa.me/"+obj.whatsapp+'/?text='+
    encodeURI("Hi "+user.displayName+" here, I'm interested in the "+obj.name+" you posted on CRCE Social.");
    window.open(chatUrl,'_blank')
  }
  

  return (
    <div className='feed'>
        {items.map((i)=>{
          return <div key={i.image} className='feed-card'>
          <h2 className='feed-card-header'>{i.name}</h2>
          <div className='feed-card-details'>
            <div>₹&nbsp;{i.price}</div>
          </div>
          <div className='feed-card-actions'>
          <button className='bg-black' onClick={()=>expandItem(i)}>View</button>
          <button className='bg-blue' onClick={()=>Chat(i)}>Chat</button>
          </div>
          </div>
          })}
    </div>
  )
}
