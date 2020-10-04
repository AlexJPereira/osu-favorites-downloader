import React from 'react'

import './style.css'
import LoginInput from '../LoginInput'
import ForgotPassword from '../ForgotPassword'
import LoginButton from '../LoginButton'

const { ipcRenderer } = window.require("electron");

export default class LoginCard extends React.Component{
    login(){
        const usernameInput: HTMLInputElement  = document.getElementById("username-input") as HTMLInputElement
        const passwordInput: HTMLInputElement = document.getElementById("password-input") as HTMLInputElement

        ipcRenderer.send("loginOsu", {
            username: usernameInput.value,
            password: passwordInput.value
        })
    }

    render(){
        return (
            <div className="login-page">
                <div className="login-card">
                    <div className="login-card-top">
                        <LoginInput id="username-input" placeholder="Username"/>
                        <LoginInput id="password-input" placeholder="Password" password/>
                        <div className="forgot-password-container">
                            <ForgotPassword/>
                        </div>
                    </div>
                    <div className="login-card-bottom">
                        <LoginButton onClick={this.login}/>
                    </div>
                </div>
            </div>
        )
    }
}