import React from 'react'

import './style.css'

import LoginInput from '../LoginInput'
import LoginButton from '../LoginButton'

export interface IDownloadPanelState{
    favoriteCount: number
}

export interface IDownloadPanelProps extends IDownloadPanelState{
    buttonFunction(event: React.MouseEvent<Element, MouseEvent> | undefined): void
    onChangeCount: Function
    onChangeOffset: Function
}

export interface IDownloadProperties{
    withVideo: boolean,
    beatmapCount: number,
    offset: number
}

export default class DownloadPanel extends React.Component<IDownloadPanelProps>{
    state: IDownloadPanelState = {
        favoriteCount: this.props.favoriteCount
    }

    private isChanging = false
    private inputChangeUpdateDelay = 3000
    private changeTimeout: number = 0

    public getDownloadProperties = (): IDownloadProperties => {
        const videoSelect = document.getElementById("video") as HTMLSelectElement
        const offsetInput = document.getElementById("download-panel-offset-input") as HTMLInputElement
        const countInput = document.getElementById("download-panel-count-input") as HTMLInputElement

        return {
            withVideo: videoSelect.value === "with-video" ? true : false,
            offset: Number.parseInt(offsetInput.value),
            beatmapCount: Number.parseInt(countInput.value)
        }
    }

    private delayControl = (callback: Function): any => {
        if(!this.isChanging){
            this.isChanging = true
            this.changeTimeout = window.setTimeout(() => {
                this.isChanging = false
                callback()
            }, this.inputChangeUpdateDelay)
        }else{
            clearTimeout(this.changeTimeout)
            this.changeTimeout = window.setTimeout(() => {
                this.isChanging = false
                callback()
            }, this.inputChangeUpdateDelay)
        }
    }

    get currentOffset(){
        const offsetInput = document.getElementById("download-panel-offset-input") as HTMLInputElement
        return offsetInput ? Number.parseInt(offsetInput.value) : 0
    }

    render() {
        return(
            <div className="download-panel-container">
                <h1>Favorite Count: {this.state.favoriteCount}</h1>
                <div className="download-panel-type-container">
                    <div className="download-panel-offset-container">
                        <select className="download-panel-video-select" name="video" id="video">
                            <option value="no-video">No Video</option>
                            <option value="with-video">With Video</option>
                        </select>
                    </div>
                    <div className="download-panel-offset-container">
                        <h1>Offset:</h1>
                        <LoginInput id="download-panel-offset-input" placeholder="offset" value="0" type="number" minValue={0} maxValue={this.props.favoriteCount}
                            onChange={() => this.delayControl(this.props.onChangeOffset)}/>
                    </div>
                    <div className="download-panel-offset-container">
                        <h1>Count:</h1>
                        <LoginInput id="download-panel-count-input" placeholder="offset" value="1" type="number" minValue={1} maxValue={this.props.favoriteCount - this.currentOffset}
                            onChange={() => this.delayControl(this.props.onChangeCount)}/>
                    </div>
                    <div className="download-panel-offset-container">
                        <LoginButton text="Download" onClick={this.props.buttonFunction}/>
                    </div>
                </div>
            </div>
        )
    }
}