import React, {Component} from 'react'

import './style.css'
import LoginCard from '../components/LoginCard'

function test(){
    alert("test")
} 

export default class MainPage extends Component{
    render(){
        return (
            <div className="main-page">
                <img className="background-image" src="/assets/osu-background.jpg" alt=""></img>
                <LoginCard/>
            </div>
        )
    }
}