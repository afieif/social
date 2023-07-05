import React from 'react'
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CollectUserData from './components/CollectUserData/CollectUserData';
import {Routes,Route} from 'react-router-dom';
import Marketplace from './components/Marketplace/Marketplace';
import Sell from './components/Marketplace/Sell';
import ExpandedView from './components/Marketplace/ExpandedView';
import Account from './components/Account/Account';
import Chat from './components/Connect/Chat';

export default function App() {
 
  return (
        <Routes>
          <Route exact path='/' element={<ProtectedRoute/>}>
            <Route exact path='/' element={<Marketplace/>}/>
            <Route exact path='/account' element={<Account/>}/>
            <Route exact path='/sell' element={<Sell/>}/>
            <Route exact path='/buy/:id' element={<ExpandedView/>}/>
            <Route exact path='/chat/:room' element={<Chat/>}/>
          </Route>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/onboard' element={<CollectUserData/>}/>
        </Routes>
  )
}
