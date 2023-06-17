import React, {useEffect} from 'react'
import SellAppBar from './SellAppBar'
import {useAuth} from '../../context/AuthContext'
import { useStore } from '../../context/StorageContext';
import { useParams } from 'react-router-dom';


export default function ExpandedView() {
  const {user} = useAuth();
  const {expandedItem, getItemByUid} = useStore();
  const {id} = useParams();

  useEffect(() => {
    getItemByUid(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function handleShare(){
    try {
      await navigator.share({
        title: 'Share via',
        text: 'Check out this listing on CRCE Social!',
        url: window.location.origin+'/#/buy/'+id,
      });
      console.log('Shared successfully');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  function Chat(obj){
    const chatUrl = "https://wa.me/"+obj.whatsapp+'/?text='+
    encodeURI("Hi "+user.displayName+" here, I'm interested in the "+obj.name+" you posted on CRCE Social.");
    window.open(chatUrl,'_blank')
  }  

  return (
    <div className='body' style={{"color":"aliceblue"}}>
    <SellAppBar/>
    <img src={expandedItem.image}
      alt='product'
      width={'300px'}
      height={'300px'}
      className='product-image'
    />
    <div style={{"margin-top":"10px"}} className='no-spill-text'>{expandedItem.name}</div>
    <div style={{"font-size":"20px"}} className='feed-card-header no-spill-text'>
    ₹&nbsp;{expandedItem.price}&nbsp;💸
    </div>
    <div className='description'>
    {expandedItem.description}
    </div>
    <div className='expanded-actions'>
    <button className='bg-black' onClick={handleShare}>Share</button>
    <button className='bg-blue' onClick={()=>Chat(expandedItem)}>Chat</button>
    </div>
    </div>
  )
}
