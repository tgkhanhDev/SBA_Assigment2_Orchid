import React from 'react'
import LoginTitle from '../templates/loginTemplates/LoginTitle'
import LoginForm from '../templates/loginTemplates/LoginForm'
import LoginFooter from '../templates/loginTemplates/LoginFooter'

export const LoginLayout = () => {
    return (
        <div className="d-flex align-items-center justify-content-center h-100" style={{ background: '#21222D' }}>
            <div className="card shadow-lg" style={{ maxWidth: "400px", width: "100%", background: '#171821' }}>
                <div className="card-body p-4">
                    <LoginTitle />
                    <LoginForm />
                    <LoginFooter />
                </div>
            </div>
        </div>
    )
}

export default LoginLayout