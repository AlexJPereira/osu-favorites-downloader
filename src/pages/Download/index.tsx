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
    currentCount: number,
    downloading: boolean,
    loading: boolean
}

export default class Download extends React.Component<RouteComponentProps>{
    state: IDownloadPageState = {...(this.props.history.location.state as IUser),
        favoriteCount: 0,
        currentCount: 1,
        currentOffset: 0,
        downloading: false,
        loading: false
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
        ipcRenderer.on("downloadCanceled", event => {
            this.favoriteList.current?.setState({progress: 0})
            this.setCountInputValue(this.state.currentCount)
            this.setOffsetInputValue(this.state.currentOffset)
            this.setState({downloading: false, loading: false})
        })
        ipcRenderer.on("finishLoading", event => {
            this.setState({loading: false})
        })
    }

    setOffsetInputValue(value: number){
        const offsetInput = document.getElementById("download-panel-offset-input") as HTMLInputElement
        offsetInput.value = value+""
    }

    setCountInputValue(value: number){
        const offsetInput = document.getElementById("download-panel-count-input") as HTMLInputElement
        offsetInput.value = value+""
    }

    private buttonHandler(){
        if(this.state.loading)
            return
        if(this.state.downloading){
            ipcRenderer.send("stopDownload")
            this.setState({downloading: false})
        }else{
            this.setState({loading: true})
            const downloadProperties = this.downloadPanel.current?.getDownloadProperties()
            if(downloadProperties){
                this.favoriteList.current?.updateFavoriteList(downloadProperties?.offset, downloadProperties?.beatmapCount)
                ipcRenderer.send("downloadFavorites",
                    this.state.userId,
                    downloadProperties?.withVideo || false,
                    downloadProperties?.beatmapCount || this.state.favoriteCount,
                    downloadProperties?.offset || 0
                )
                this.setState({downloading: true})
            }
        }
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
            currentOffset: this.state.currentOffset + 1,
            downloading: (this.state.currentCount-1 <= 0) ? false : true
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
                            onChangeOffset={this.onChangeInput}
                            downloading={this.state.downloading}
                            loading={this.state.loading}/>
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