import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StorageContext';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function ProtectedRoute() {
  const { user } = useAuth();
  const { isNewUser } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [checkNewUser, setCheckNewUser] = useState(true);
  const Nav = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      if (user) {
        const newUser = await isNewUser(user.uid);
        setCheckNewUser(newUser);
        setIsLoading(false);
      }
      else{
        Nav('/login')
      }
    };

    checkUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewUser, user]);

  if (isLoading) {
    return <LoadingScreen/>;
  }

  return (
    <div>
      {user ? (
        checkNewUser ? (
          <Navigate to="/onboard" replace={true} />
        ) : (
          <Outlet />
        )
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </div>
  );
}
