import React, {Component} from 'react'

export interface ITestProps {}

export default class Test extends Component{
    state = {
        timerCount: 0
    }

    constructor(props: ITestProps){
        super(props)
        setInterval(()=>{
            this.setState({timerCount: this.state.timerCount + 1})
        }, 1000)
    }

    render(){
        return (
            <h1>Counting... {this.state.timerCount}</h1>
        )
    }
}