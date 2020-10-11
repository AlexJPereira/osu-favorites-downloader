import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import './style.css'
import { IUser } from '../../electron/src/api/osuUser'
import BackgroundImage from '../../components/BackgroundImage'

export default class Download extends React.Component<RouteComponentProps>{
    state: IUser = this.props.history.location.state as IUser
    
    render(){
        return(
            // main-page style its in /pages/Login/style.css
            <div className="main-page">
                <BackgroundImage/>
                <div className="download-page">
                    <div className="download-card">
                        <div className="download-welcome">
                            <h1>Welcome {this.state.username}</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}