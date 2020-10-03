import React from 'react'

import './style.css'
import LoginInput from '../LoginInput'

export default class LoginCard extends React.Component{
    render(){
        return (
            <div className="login-page">
                <div className="login-card">
                    <LoginInput placeholder="Username"/>
                    <LoginInput placeholder="Password" password/>
                </div>
            </div>
        )
    }
}