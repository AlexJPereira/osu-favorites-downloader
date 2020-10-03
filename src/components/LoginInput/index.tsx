import React from 'react'

import './style.css'

interface ILoginInputProps{
    placeholder?: string
    password?: boolean
}

export default function(props: ILoginInputProps){
    return (
        <input className="login-input" placeholder={props.placeholder} type={props.password ? "password" : ""}/>
    )
}