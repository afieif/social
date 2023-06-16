import React from 'react'
import { AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function SellAppBar() {
const Navigate = useNavigate();
return (
    <AppBar>
        <Toolbar>
            <ArrowBackIcon fontSize='large' onClick={()=>Navigate('/')}/>
        </Toolbar>
    </AppBar>
)
}
