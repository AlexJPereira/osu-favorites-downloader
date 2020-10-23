import React from 'react'

import './style.css'

import LoginInput from '../LoginInput'
import LoginButton from '../LoginButton'

export interface IDownloadPanelState{
    favoriteCount: number
}

export default class DownloadPanel extends React.Component<{favoriteCount: number}>{
    state: IDownloadPanelState = {
        favoriteCount: this.props.favoriteCount
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
                        <LoginInput id="download-panel-input" placeholder="offset" value="0"/>
                    </div>
                    <div className="download-panel-offset-container">
                        <h1>Count:</h1>
                        <LoginInput id="download-panel-input" placeholder="offset" value="0"/>
                    </div>
                    <div className="download-panel-offset-container">
                        <LoginButton text="Download" onClick={()=>{alert("test")}}/>
                    </div>
                </div>
            </div>
        )
    }
}