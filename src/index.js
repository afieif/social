import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CollectUserData from './components/CollectUserData/CollectUserData';
import {HashRouter as Router,Routes,Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StorageProvider } from './context/StorageContext';
import Marketplace from './components/Marketplace/Marketplace';
import Sell from './components/Marketplace/Sell';

// TODO Create a context and define all firebase db calls there
// collect user data using protectedRoute logic


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <StorageProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<ProtectedRoute/>}>
            <Route exact path='/' element={<Marketplace/>}/>
            <Route exact path='/sell' element={<Sell/>}/>
          </Route>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/onboard' element={<CollectUserData/>}/>
        </Routes>
      </Router>
    </StorageProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
