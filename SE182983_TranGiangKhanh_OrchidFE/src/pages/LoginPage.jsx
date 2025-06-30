import React, { useEffect } from 'react'
import LoginLayout from '../components/layouts/LoginLayout';

const LoginPage = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      window.location.href = "/";
    }
  }, [])

  return (
    <div className='vh-100'>
      <LoginLayout />
    </div>
  );
}

export default LoginPage