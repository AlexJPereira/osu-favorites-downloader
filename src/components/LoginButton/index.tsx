import React, {MouseEvent} from 'react'

import './style.css'

interface ILoginButtonProps{
    onClick(event?: MouseEvent): void
}

export default function(props: ILoginButtonProps){
    return (
        <button className="login-button" onClick={props.onClick}>Sign in</button>
    )
}