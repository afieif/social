import React from 'react'
import Navbar from '../Navbar/Navbar'
import '../../App.css';
import MarketAppBar from './MarketAppBar';
import Feed from './Feed';



export default function Marketplace() {
  
  return (
    <div className='body'>
    <MarketAppBar/>
    <Feed/>
    <Navbar/>
    </div>
  )
}
