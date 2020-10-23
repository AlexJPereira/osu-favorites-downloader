import React from 'react'

import './style.css'
import { IBeatmapFavoriteList } from '../../electron/src/api/osuFavoriteList'

export interface IFavoriteCardProps{
    favorite: IBeatmapFavoriteList
}

export default class FavoriteCard extends React.Component<IFavoriteCardProps>{
    render(){
        return(
            <li className="favoritecard-container">
                <img src={this.props.favorite.covers.cover} alt="favorite-cover"></img>
                <div className="favoritecard-details">
                    <div className="favoritecard-top">
                        <div className="favoritecard-bottom">
                            <label className="favoritecard-title">{this.props.favorite.title}</label>
                            <label className="favoritecard-artist">{this.props.favorite.artist}</label>
                        </div>
                        <div className="favoritecard-countdetails">
                            <div className="favoritecard-favcount">
                                <label>{this.props.favorite.favourite_count}</label>
                                <i className="fa fa-heart"></i>
                            </div>
                            <div className="favoritecard-playcount">
                                <label>{this.props.favorite.play_count}</label>
                                <i className="fa fa-play-circle"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}