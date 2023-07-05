import React from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation();
  return (
    <div className='navbar'>
    <BottomNavigation value={location.pathname==='/'? 0 : location.pathname==='/rooms'? 1 : 2} showLabels>
      <BottomNavigationAction component={Link} to={"/"} label="Trade" icon={<LocalGroceryStoreIcon/>}/>
      <BottomNavigationAction component={Link} to={"/rooms"} label="Discuss" icon={<ChatIcon/>}/>
      <BottomNavigationAction component={Link} to={"/account"} label="Account" icon={<AccountCircleIcon/>}/>
    </BottomNavigation>
    </div>
  );
};

export default Navbar;
