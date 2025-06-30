import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {authService} from '../../../services/authService'

export const RegisterForm = () => {
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    accountName: '', 
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.id]: e.target.value,
    });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    const { accountName, email, password, confirmPassword } = registerForm;

    if (!accountName || !email || !password || !confirmPassword) {
      setError('Vui lòng điền đầy đủ tất cả các trường.');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email không hợp lệ.');
      setLoading(false);
      return;
    }

    try {
      const response = await authService.createAccount({
        accountName,
        email,
        password
      });
      console.log("response: ", response);
      
      if (response.code == 201) {
        setSuccessMessage('Đăng ký thành công! Vui lòng đăng nhập.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.data.message || 'Đăng ký thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || 'Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={registerHandler} className="register-form">
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="form-group">
        <label htmlFor="accountName" className="form-label">
          Họ và tên
        </label>
        <input
          type="text"
          id="accountName"
          className="form-control"
          placeholder="Nhập họ và tên của bạn"
          value={registerForm.accountName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="form-control"
          placeholder="Nhập email của bạn"
          value={registerForm.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Mật khẩu
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          placeholder="Nhập mật khẩu"
          value={registerForm.password}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword" className="form-label">
          Xác nhận mật khẩu
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="form-control"
          placeholder="Xác nhận mật khẩu"
          value={registerForm.confirmPassword}
          onChange={handleInputChange}
          required
        />
      </div>

      <button type="submit" className="btn w-100" style={{ background: '#73CABE', color: '#f6f6f6', fontWeight: 'bold' }}>
        Đặng ký
      </button>
    </form>
  );
};

export default RegisterForm;