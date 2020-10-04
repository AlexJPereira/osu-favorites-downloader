import React from 'react'

import './style.css'
import LoginInput from '../LoginInput'
import ForgotPassword from '../ForgotPassword'
import LoginButton from '../LoginButton'
import { ILoginOsu } from '../../electron/src/ipcMain'

const { ipcRenderer } = window.require("electron");

const envUsername = process.env.REACT_APP_OSU_USERNAME || ""
const envPassword = process.env.REACT_APP_OSU_PASSWORD || ""

export default class LoginCard extends React.Component{
    login(){
        const usernameInput: HTMLInputElement  = document.getElementById("username-input") as HTMLInputElement
        const passwordInput: HTMLInputElement = document.getElementById("password-input") as HTMLInputElement

        const user: ILoginOsu = {
            username: usernameInput.value,
            password: passwordInput.value
        }

        ipcRenderer.send("loginOsu", user)
    }

    render(){
        return (
            <div className="login-page">
                <div className="login-card">
                    <div className="login-card-top">
                        <LoginInput id="username-input" placeholder="Username" value={envUsername}/>
                        <LoginInput id="password-input" placeholder="Password" password value={envPassword}/>
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