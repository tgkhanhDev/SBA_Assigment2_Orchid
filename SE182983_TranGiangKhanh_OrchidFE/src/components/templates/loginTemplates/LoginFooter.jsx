import React from 'react'

export const LoginFooter = () => {
  return (
    <div className="text-center mt-3" style={{ color: '#727276' }}>
      Chưa có tài khoản?{" "}
      <a href="/register" className="text-decoration-none" style={{ color: '#73CABE', fontWeight: 'bold' }} >
        Đăng ký ngay
      </a>
    </div>
  )
}

export default LoginFooter