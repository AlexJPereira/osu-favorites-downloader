import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import './style.css'
import { IUser } from '../../electron/src/api/osuUser'

export default class Download extends React.Component{
    state: IUser = {
        userId: 0,
        username: "",
        userPic: ""
    }

    constructor(props: RouteComponentProps){
        super(props)
        this.state = props.history.location.state as IUser
    }
    
    render(){
        return(
            <div>
                <h1>{this.state.username}</h1>
                <h1>{this.state.userId}</h1>
            </div>
        )
    }
}