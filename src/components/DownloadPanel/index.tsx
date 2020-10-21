import React from 'react'

import './style.css'

import LoginInput from '../LoginInput'
import LoginButton from '../LoginButton'


export default function(){
    return (
        <div className="download-panel-container">
            <h1>Favorite Count: 9999</h1>
            <div className="download-panel-type-container">
                <select className="download-panel-video-select" name="video" id="video">
                    <option value="no-video">No Video</option>
                    <option value="with-video">With Video</option>
                </select>
                <div className="download-panel-offset-container">
                    <h1>Offset:</h1>
                    <LoginInput id="download-panel-input" placeholder="offset" value="0"/>
                </div>
            </div>
            <LoginButton text="Download" onClick={()=>{alert("test")}}/>
        </div>
    )
}