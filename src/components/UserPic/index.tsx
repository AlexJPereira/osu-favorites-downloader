import React from 'react'

import './style.css'

export interface IUserPicProps{
    picPath: string
}

export default class UserPic extends React.Component<IUserPicProps>{
    render(){
        return(
            <div className="userpic-container">
                <img src={this.props.picPath} alt="profile"/>
            </div>
        )
    }
}