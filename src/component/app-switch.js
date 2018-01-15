import React from 'react'
import { Switch, Route } from 'react-router-dom'

function NotFound() {
    return <div style={{ fontSize: '200px' }}>你又写错 Link 的地址了！！！</div>
}

export default function AppSwitch({ children }) {
    return (
        <Switch>
            {children}
            <Route component={NotFound} />
        </Switch>
    )
}
