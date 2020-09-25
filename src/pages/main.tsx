import React, {Component} from 'react'

function test(){
    alert("test")
} 

export default class MainPage extends Component{
    render(){
        return (
            <button onClick={test}>test script</button>
        )
    }
}