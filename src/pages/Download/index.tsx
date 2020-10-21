import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import './style.css'
import { IUser } from '../../electron/src/api/osuUser'
import BackgroundImage from '../../components/BackgroundImage'
import UserInfo from '../../components/UserInfo'
import BeatmapList from '../../components/BeatmapList'
import DownloadPanel from '../../components/DownloadPanel'

export default class Download extends React.Component<RouteComponentProps>{
    state: IUser = this.props.history.location.state as IUser
    
    render(){
        return(
            // main-page style its in /pages/Login/style.css
            <div className="main-page">
                <BackgroundImage/>
                <div className="download-page">
                    <div className="download-card">
                        <UserInfo user={this.state}/>
                        <DownloadPanel userId={this.state.userId}/>
                        <div className="download-beatmaplist">
                            <BeatmapList userId={this.state.userId}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}