import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Download from './pages/Download'

export default function Routes(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/download" component={Download}/>
            </Switch>
        </HashRouter>
    )
}
