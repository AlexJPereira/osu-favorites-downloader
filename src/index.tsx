import React from 'react';
import ReactDOM from 'react-dom';

import Router from './routes'

const { ipcRenderer } = window.require("electron");

ipcRenderer.on("errorDialog", (event, message: string, highlightComponentId?: string) => {
    alert(message)
    if(highlightComponentId){
        const element = document.getElementById(highlightComponentId)
        if(element)
            element.className += " error"
    }
})

ReactDOM.render(<Router/>, document.getElementById('root'));


