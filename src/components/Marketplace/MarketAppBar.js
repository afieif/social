import React from 'react'
import { AppBar, Toolbar } from '@mui/material';
import SellIcon from '@mui/icons-material/Sell';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';



export default function MarketAppBar() {
  const Navigate = useNavigate();
  return (
    <AppBar>
        <Toolbar>
            <img src={require('../../assets/logo-nav.png')} alt='logo' className='nav-logo'/>
            <Badge badgeContent={'Sell'} className='font-Inter' color="secondary"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
            <SellIcon fontSize='medium' onClick={()=>Navigate('/sell')}/>
            </Badge>
        </Toolbar>
    </AppBar>
  )
}
