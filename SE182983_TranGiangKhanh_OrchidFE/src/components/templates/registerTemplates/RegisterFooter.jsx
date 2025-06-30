import React from 'react'

export const LoginFooter = () => {
  return (
    <div className="text-center mt-3" style={{ color: '#727276' }}>
      Đã có tài khoản?{" "}
      <a href="/login" className="text-decoration-none" style={{ color: '#73CABE', fontWeight: 'bold' }} >
        Đăng nhập ngay
      </a>
    </div>
  )
}

export default LoginFooter