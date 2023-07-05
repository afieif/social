import React from 'react'
import { AppBar, Toolbar } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Rooms() {
  const Navigate = useNavigate();
  return (
    <div className='rooms'>
      <AppBar>
        <Toolbar>
            <div className='app-bar-text'>{'Discuss'}</div>
        </Toolbar>
      </AppBar>
      <div className='room-feed'>
      <div onClick={()=>Navigate('/chat/general')}>General</div>
      <div onClick={()=>Navigate('/chat/placements')}>Placements</div>
      <div onClick={()=>Navigate('/chat/masters')}>Higher Studies</div>
      <div onClick={()=>Navigate('/chat/fe')}>FE</div>
      <div onClick={()=>Navigate('/chat/mech')}>MECH</div>
      <div onClick={()=>Navigate('/chat/comps')}>COMPS</div>
      <div onClick={()=>Navigate('/chat/aids')}>AIDS</div>
      <div onClick={()=>Navigate('/chat/ecs')}>ECS</div>
      </div>
      <Navbar/>
    </div>
  )
}
