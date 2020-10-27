import React from 'react'

import './style.css'

interface ILoginInputProps{
    placeholder?: string
    password?: boolean
    id?: string
    value?: string
    type?: string
}

export default function(props: ILoginInputProps){
    return (
        <input id={props.id} className="login-input" placeholder={props.placeholder} type={props.password ? "password" : props.type ? props.type : ""} defaultValue={props.value}/>
    )
}