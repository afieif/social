/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useMemo} from 'react';
import { db, auth } from '../../firebase';
import { useParams } from 'react-router-dom';
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import ChatroomBar from './ChatroomBar';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [disableText, setDisableText] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const messagesRef = collection(db, 'messages');
  const { room } = useParams();
  const dummy = useRef();

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where('room', '==', room),
      orderBy('createdAt')
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      setTimeout(()=>dummy.current.scrollIntoView({ behavior: 'smooth' }),0);
    });
    return () => {
      unsubscribe();
    };
  }, [room]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === '') return;
    setNewMessage('Sending...')
    setDisableText(true);
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      pfp: auth.currentUser.photoURL,
      room: room,
    });
    setDisableText(false);
    setNewMessage('');
  };

  const renderMessages = useMemo(() => {
    return messages.map((message) => (
      <div
        key={message.id}
        className={
          message.uid === auth.currentUser.uid
            ? 'chat-bubble sender'
            : 'chat-bubble'
        }
      >
        {message.uid === auth.currentUser.uid ? (
          <>
            <div className='message-container'>
              <p className='sender-name'>{message.user}</p>
              <p className='message'>{message.text}</p>
            </div>
            <div className='profile-photo-sender'>
              <img
                src={
                  message.pfp
                    ? message.pfp
                    : require('../../assets/pfp.jpg')
                }
                alt="Sender's Profile"
              />
            </div>
          </>
        ) : (
          <>
            <div className='profile-photo'>
              <img
                src={
                  message.pfp
                    ? message.pfp
                    : require('../../assets/pfp.jpg')
                }
                alt='Profile'
              />
            </div>
            <div className='message-container'>
              <p className='sender-name'>{message.user}</p>
              <p className='message'>{message.text}</p>
            </div>
          </>
        )}
      </div>
    ));
  }, [messages]);

  return (
    <div className='chat-parent'>
      <ChatroomBar name={room} />
      <div className='messages'>
        {renderMessages}
        <span ref={dummy}></span>
      </div>

      <form onSubmit={handleSubmit} autocomplete="off">
        <div class='chat-textbox'>
          <input
            id='message-input'
            type='text'
            disabled={disableText}
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            placeholder='Type your message here...'
          />
          <button id='send-button' type='submit'>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
