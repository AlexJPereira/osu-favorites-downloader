import React from 'react'

import './style.css'
import { IBeatmapFavoriteList } from '../../electron/src/api/osuFavoriteList'
import FavoriteCard from '../FavoriteCard'

const { ipcRenderer } = window.require("electron");

export interface IBeatmapListProps{
    userId: number
}

export default class BeatmapList extends React.Component<IBeatmapListProps>{
    state = {
        favoriteList: [] as IBeatmapFavoriteList[],
        progress: 0
    }

    constructor(props: IBeatmapListProps){
        super(props)
        ipcRenderer.send("getFavoriteList", props.userId)
        ipcRenderer.on("getFavoriteListReply", (event, beatmapList: IBeatmapFavoriteList[])=>{
            this.setState({ favoriteList: beatmapList })
        })
        ipcRenderer.on("progressUpdate", (event, progress) => {
            this.setState({progress: progress})
        })
    }
    render(){
        return(
            <div className="beatmaplist-container">
                <progress id="beatmaplist-progress" value={this.state.progress} max="100"/>
                <ul className="beatmaplist-list">
                    {this.state.favoriteList.map((favorite, index)=>(
                        <FavoriteCard key={index} favorite={favorite}/>
                    ))}
                    <div className="beatmaplist-continue">
                        <h1>...</h1>
                    </div>
                </ul>
            </div>
        )
    }
}