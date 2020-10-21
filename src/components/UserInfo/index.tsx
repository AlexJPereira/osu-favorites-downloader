import React from 'react'

import './style.css'

import UserPic from '../UserPic'
import { IUser } from '../../electron/src/api/osuUser'

export interface IUserInfoProps{
    user: IUser
}

export default function UserInfo(props: IUserInfoProps){
    return (
        <div className="user-info-card">
            <UserPic picPath={props.user.userPic}/>
            <div className="user-info-text">
                <h1>{props.user.username}</h1>
                <h1>user ID: {props.user.userId}</h1>
                <img src={`https://osu.ppy.sh/images/flags/${props.user.country}.png`} alt="country-flag"/>
            </div>
        </div>
    )
}