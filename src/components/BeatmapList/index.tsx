import React from 'react'

import './style.css'
import { IBeatmapFavoriteList } from '../../electron/src/api/osuFavoriteList'

const { ipcRenderer } = window.require("electron");

export interface IBeatmapListProps{
    userId: number
}

export default class BeatmapList extends React.Component<IBeatmapListProps>{
    state = {
        favoriteList: [] as IBeatmapFavoriteList[]
    }

    constructor(props: IBeatmapListProps){
        super(props)
        ipcRenderer.send("getFavoriteList", props.userId)
        ipcRenderer.on("getFavoriteListReply", (event, beatmapList: IBeatmapFavoriteList[])=>{
            this.setState({ favoriteList: beatmapList })
        })
    }
    render(){
        return(
            <div className="beatmaplist-container">
                <ul className="beatmaplist-list">
                    {this.state.favoriteList.map(()=>{
                        
                    })}
                </ul>
            </div>
        )
    }
}