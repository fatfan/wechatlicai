import React from 'react'
import reactDOM from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'

import './lib/flexible'

import './assets/css/normalize.css'
import './assets/css/app.less'

import AppSwitch from 'src/component/app-switch'

import HomeRouter from 'src/pages/home'
import { InvestRouter } from 'src/pages/invest'
import { MineRouter } from 'src/pages/mine'
import { MoreRouter } from 'src/pages/more'
import Login from 'src/pages/login'
import Register from 'src/pages/register'

export default function App() {
    return (
        <Router>
            <AppSwitch>
                <Route exact path="/:tab(|invest|mine|more)" component={HomeRouter} />
                <Route path="/invest" component={InvestRouter} />
                <Route path="/mine" component={MineRouter} />
                <Route path="/more" component={MoreRouter} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </AppSwitch>
        </Router>
    )
}

reactDOM.render(
    <App />,
    document.getElementById('app')
)
