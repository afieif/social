import React from 'react'
import { AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ChatroomBar(props) {
const Navigate = useNavigate();
return (
    <AppBar>
        <Toolbar>
            <ArrowBackIcon fontSize='large' onClick={()=>Navigate('/rooms')}/>
            {props.name.toUpperCase()}
        </Toolbar>
    </AppBar>
)
}
