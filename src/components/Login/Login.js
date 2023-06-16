import React, {useEffect} from 'react'
import { googleAuth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';



export default function Login() {

    const navigate = useNavigate();
    const {user} = useAuth();

    useEffect(() => {
        console.log(user)
        if(user){
            navigate('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    // CRCE Social: Empowering Students, Redefining College Convenience
    
  return (
    <div className='login-body'>
            <img src={require('../../assets/crce-social-logo.png')} alt='card for aesthetic' className='logo'/>
            <img src={require('../../assets/Social.png')} alt='card for aesthetic' className='login-graphic'/>
            <div className='google-login-button' onClick={()=>googleAuth()}>
                <div className='google-login-button-text'>Login With Google</div>
            </div>
    </div>
  )
}