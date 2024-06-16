import React, {useEffect, useMemo, useCallback} from 'react'
import { useStore } from '../../context/StorageContext'
import {useAuth} from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Filter from './Filter';

export default function Feed() {
  const {getItems, items, expandItem} = useStore();
  const {user} = useAuth();
  const Navigate = useNavigate();

  useEffect(() => {
    getItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Chat = useCallback((obj) => {
    const chatUrl = "https://wa.me/" + obj.whatsapp + '/?text=' +
      encodeURI("Hi " + user.displayName + " here, I'm interested in the " + obj.name + " you posted on CRCE Social.");
    window.open(chatUrl, '_blank');
  }, [user]);

  const Expand = useCallback((obj) => {
    expandItem(obj);
    Navigate('/buy/' + obj.uid);
  }, [expandItem, Navigate]);

  const renderedItems = useMemo(() => {
    return items.map((i) => (
      <div key={i.image} className='feed-card'>
        <h2 className='feed-card-header'>{i.name}</h2>
        <div className='feed-card-details'>
          <div>₹&nbsp;{i.price}</div>
        </div>
        <div className='feed-card-actions'>
          <button className='bg-black' onClick={() => Expand(i)}>View</button>
          <button className='bg-blue' onClick={() => Chat(i)}>Chat</button>
        </div>
      </div>
    ));
  }, [items,Chat,Expand]);
  

  return (
    <div className='feed'>
        <Filter/>
        {renderedItems}
    </div>
  )
}
