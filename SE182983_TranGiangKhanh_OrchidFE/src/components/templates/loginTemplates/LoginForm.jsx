import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authService from '../../../services/authService';
import Swal from 'sweetalert2';

export const LoginForm = () => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  const loginHandler = async (e) => {
    e.preventDefault();
    const response = await authService.loginUser(loginForm);
    console.log("outsideRes: ", response);
    if (response.code == 200) {
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('role', JSON.stringify(response.data.accountRole));
      localStorage.setItem('id', JSON.stringify(response.data.accountId));
      localStorage.setItem('name', JSON.stringify(response.data.accountName));
      navigate('/');
      return
    } else {
      return
    }
  };

  return (
    <form onSubmit={(e) => loginHandler(e)}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label text-white">
          Email
        </label>
        <input
          type="text"
          id="username"
          className="form-control"
          placeholder="Nhập email"
          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label text-white">
          Mật khẩu
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          placeholder="Nhập mật khẩu"
          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
        />
      </div>
      <button type="submit" className="btn w-100" style={{ background: '#73CABE', color: '#f6f6f6', fontWeight: 'bold' }}>
        Đặng nhập
      </button>
    </form>
  )
}

export default LoginForm