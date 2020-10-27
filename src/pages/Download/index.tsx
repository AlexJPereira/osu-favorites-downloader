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
    favoriteCount: number,
    currentOffset: number,
    currentCount: number
}

export default class Download extends React.Component<RouteComponentProps>{
    state: IDownloadPageState = {...(this.props.history.location.state as IUser),
        favoriteCount: 0,
        currentCount: 0,
        currentOffset: 0
    }
    public downloadPanel = React.createRef<DownloadPanel>()
    public favoriteList = React.createRef<BeatmapList>()

    constructor(props: any){
        super(props)
        ipcRenderer.send("getFavoriteCount", this.state.userId)
        ipcRenderer.on("FavoriteCountReply", (event, arg) => {
            this.setState({favoriteCount: arg})
            this.downloadPanel.current?.setState({favoriteCount: arg})
        })
    }

    private buttonHandler(){
        const downloadProperties = this.downloadPanel.current?.getDownloadProperties()
        if(!downloadProperties)
            alert("error")

        ipcRenderer.send("downloadFavorites",
            this.state.userId,
            downloadProperties?.withVideo || false,
            downloadProperties?.beatmapCount || this.state.favoriteCount,
            downloadProperties?.offset || 0
        )
    }

    private onChangeInput = () => {
        const downloadProperties = this.downloadPanel.current?.getDownloadProperties()
        if(downloadProperties){
            this.setState({
                currentCount: downloadProperties.beatmapCount,
                currentOffset: downloadProperties.offset
            })
            this.favoriteList.current?.updateFavoriteList(downloadProperties?.offset, downloadProperties?.beatmapCount)
        }
    }

    updateDownloadInfo = () => {
        this.setState({
            currentCount: this.state.currentCount - 1,
            currentOffset: this.state.currentOffset + 1
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
                        <DownloadPanel ref={this.downloadPanel} 
                            favoriteCount={this.state.favoriteCount} 
                            buttonFunction={this.buttonHandler.bind(this)}
                            onChangeCount={this.onChangeInput}
                            onChangeOffset={this.onChangeInput}/>
                        <div className="download-beatmaplist">
                            <BeatmapList ref={this.favoriteList} userId={this.state.userId} updateDownloadInfo={this.updateDownloadInfo}/>
                        </div>
                        <div className="download-page-download-info">
                            <h1>Current beatmap Offset: {this.state.currentOffset}</h1>
                            <h1>Beatmaps left: {this.state.currentCount}</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}