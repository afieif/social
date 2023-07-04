import React, {useEffect} from 'react'
import { useStore } from '../../context/StorageContext'
import {useAuth} from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';


export default function MyFeed() {
  const {getMyItems, myItems, deleteItem, expandItem} = useStore();
  const Navigate = useNavigate();
  const {user} = useAuth();

  useEffect(() => {
    getMyItems(user.uid);
    console.log(user)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function Expand(obj){
    expandItem(obj);
    Navigate('/buy/'+obj.uid);
  }
  

  return (
    <div className='feed'>
        {myItems.map((i)=>{
          return <div key={i.image} className='feed-card'>
          <h2 className='feed-card-header'>{i.name}</h2>
          <div className='feed-card-details'>
            <div>₹&nbsp;{i.price}</div>
          </div>
          <div className='feed-card-actions'>
          <button className='bg-black' onClick={()=>Expand(i)}>View</button>
          <button className='bg-red' onClick={()=>deleteItem(i.uid)}>Delete</button>
          </div>
          </div>
          })}
    </div>
  )
}
