import React, {Component} from 'react'

import OsuApi from '../api/osuApi'

const test = new OsuApi()

export default class MainPage extends Component{
    render(){
        return (
            <button onClick={test.alert}>test script</button>
        )
    }
}