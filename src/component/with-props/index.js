import React from 'react'

export default function withProps(Component, props) {
    function Wrapper(extra) {
        return (<Component {...props} {...extra} />)
    }
    Wrapper.displayName = `withProps(${Component.name})`
    return Wrapper
}
