import React from 'react'
import RegisterTitle from '../templates/registerTemplates/RegisterTitle'
import RegisterForm from '../templates/registerTemplates/RegisterForm'
import RegisterFooter from '../templates/registerTemplates/RegisterFooter'

export const RegisterLayout = () => {
    return (
        <div className="d-flex align-items-center justify-content-center h-100" style={{ background: '#21222D' }}>
            <div className="card shadow-lg" style={{ maxWidth: "400px", width: "100%", background: '#171821' }}>
                <div className="card-body p-4">
                    <RegisterTitle />
                    <RegisterForm />
                    <RegisterFooter />
                </div>
            </div>
        </div>
    )
}

export default RegisterLayout