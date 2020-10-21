import React, {MouseEvent} from 'react'

import './style.css'

interface ILoginButtonProps{
    onClick(event?: MouseEvent): void
    text?: string
}

export default function(props: ILoginButtonProps){
    return (
        <button className="login-button" onClick={props.onClick}>{props.text ? props.text : "Sign In"}</button>
    )
}