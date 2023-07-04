import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <div className='navbar'>
    <BottomNavigation value={value} onChange={handleChange} showLabels
    >
      <BottomNavigationAction component={Link} to={"/"} label="Trade" icon={<LocalGroceryStoreIcon/>}/>
      <BottomNavigationAction component={Link} to={"/sell"} label="Connect" icon={<ChatIcon/>}/>
      <BottomNavigationAction component={Link} to={"/account"} label="Account" icon={<AccountCircleIcon/>}/>
    </BottomNavigation>
    </div>
  );
};

export default Navbar;
