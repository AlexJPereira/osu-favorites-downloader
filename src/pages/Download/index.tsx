import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import './style.css'
import { IUser } from '../../electron/src/api/osuUser'
import BackgroundImage from '../../components/BackgroundImage'
import UserPic from '../../components/UserPic'
import BeatmapList from '../../components/BeatmapList'

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
                            <h1>{this.state.username}</h1>
                            <UserPic picPath={this.state.userPic}/>
                        </div>
                        <div className="download-beatmaplist">
                            <BeatmapList userId={this.state.userId}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}