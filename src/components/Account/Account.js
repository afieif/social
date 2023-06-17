import React from 'react'
import { logout } from '../../firebase'
import Navbar from '../Navbar/Navbar'
import {useAuth} from '../../context/AuthContext';
import MyFeed from './MyFeed';

export default function Account() {
    const {user} = useAuth();
  return (
    <div className='body'>
    <img src={user.photoURL} alt='pfp' className='pfp'/>
    <button onClick={logout} className='logout-btn'>Logout</button>
    <MyFeed/>
    <Navbar/>
    </div>
  )
}
