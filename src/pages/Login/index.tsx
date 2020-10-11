import React, {Component} from 'react'

import './style.css'
import LoginCard from '../../components/LoginCard'
import BackgroundImage from '../../components/BackgroundImage'

export default class MainPage extends Component{
    render(){
        return (
            <div className="main-page">
                <BackgroundImage/>
                <LoginCard/>
            </div>
        )
    }
}