import React from 'react'

import './style.css'
import LoginInput from '../LoginInput'
import ForgotPassword from '../ForgotPassword'
import LoginButton from '../LoginButton'

export default class LoginCard extends React.Component{
    render(){
        return (
            <div className="login-page">
                <div className="login-card">
                    <div className="login-card-top">
                        <LoginInput placeholder="Username"/>
                        <LoginInput placeholder="Password" password/>
                        <div className="forgot-password-container">
                            <ForgotPassword/>
                        </div>
                    </div>
                    <div className="login-card-bottom">
                        <LoginButton/>
                    </div>
                </div>
            </div>
        )
    }
}