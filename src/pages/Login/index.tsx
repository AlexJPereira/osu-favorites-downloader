import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import './style.css'
import LoginCard from '../../components/LoginCard'
import BackgroundImage from '../../components/BackgroundImage'

const { ipcRenderer } = window.require("electron");

class Login extends Component<RouteComponentProps>{

    constructor(props: RouteComponentProps){
        super(props)
        ipcRenderer.on("loginOsuReply", (event, arg)=>{
            props.history.push("/download", arg);
        })
    }

    render(){
        return (
            <div className="main-page">
                <BackgroundImage/>
                <LoginCard/>
            </div>
        )
    }
}

export default withRouter(Login)