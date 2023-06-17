import React, {useEffect} from 'react'
import { useStore } from '../../context/StorageContext'
import {useAuth} from '../../context/AuthContext'

export default function MyFeed() {
  const {getMyItems, myItems, deleteItem} = useStore();
  const {user} = useAuth();

  useEffect(() => {
    getMyItems(user.uid);
    console.log(user)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <div className='feed'>
        {myItems.map((i)=>{
          return <div key={i.image} className='feed-card'>
          <h2 className='feed-card-header'>{i.name}</h2>
          <div className='feed-card-details'>
            <div>₹&nbsp;{i.price}</div>
          </div>
          <div className='feed-card-actions'>
          <button className='bg-black' >Edit</button>
          <button className='bg-red' onClick={()=>deleteItem(i.uid)}>Delete</button>
          </div>
          </div>
          })}
    </div>
  )
}
