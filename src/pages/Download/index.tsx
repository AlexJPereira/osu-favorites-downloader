import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import './style.css'
import { IUser } from '../../electron/src/api/osuUser'
import BackgroundImage from '../../components/BackgroundImage'
import UserInfo from '../../components/UserInfo'
import BeatmapList from '../../components/BeatmapList'
import DownloadPanel from '../../components/DownloadPanel'

const { ipcRenderer } = window.require("electron");

export interface IDownloadPageState extends IUser{
    favoriteCount: number
}

export default class Download extends React.Component<RouteComponentProps>{
    state: IDownloadPageState = {...(this.props.history.location.state as IUser), favoriteCount: 0}
    public downloadPanel = React.createRef<DownloadPanel>()

    constructor(props: any){
        super(props)
        ipcRenderer.send("getFavoriteCount", this.state.userId)
        ipcRenderer.on("FavoriteCountReply", (event, arg) => {
            this.setState({favoriteCount: arg})
            this.downloadPanel.current?.setState({favoriteCount: arg})
        })
    }
    
    render(){
        return(
            // main-page style its in /pages/Login/style.css
            <div className="main-page">
                <BackgroundImage/>
                <div className="download-page">
                    <div className="download-card">
                        <UserInfo user={this.state}/>
                        <DownloadPanel ref={this.downloadPanel} favoriteCount={this.state.favoriteCount}/>
                        <div className="download-beatmaplist">
                            <BeatmapList userId={this.state.userId}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}