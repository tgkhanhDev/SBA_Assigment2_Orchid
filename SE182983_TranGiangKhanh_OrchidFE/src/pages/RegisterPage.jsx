import React, { useEffect } from 'react'
import RegisterLayout from '../components/layouts/RegisterLayout';

export const RegisterPage = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      window.location.href = "/";
    }
  }, [])

  return (
    <div className='vh-100'>
      <RegisterLayout />
    </div>
  );
}

export default RegisterPage