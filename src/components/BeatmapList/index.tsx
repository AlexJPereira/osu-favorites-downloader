import React from 'react'

import './style.css'

export interface IBeatmapListProps{
    userId: number
}

export default class BeatmapList extends React.Component<IBeatmapListProps>{
    render(){
        return(
            <div className="beatmaplist-container">
                <ul className="beatmaplist-list">
                    {()=>{

                    }}
                </ul>
            </div>
        )
    }
}