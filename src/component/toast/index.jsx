import React, { Component } from 'react'

import './index.less'

let instance

class Toast extends Component {
    constructor(prop) {
        super(prop)

        this.state = {}
        instance = this

        console.log('constructor')
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    componentDidMount() {
        // this.timmer = setTimeout(() => {
        //     this.setState({
        //         show: 0
        //     })
        // }, this.state.duation)
        console.log('componentDidMount')
    }
    shouldComponentUpdate() {
        // if (this.state.show === 1) {
        //     return false
        // }
        return true
    }
    componentWillUpdate() {
        console.log('componentWillUpdate')
    }
    componentDidUpdate() {
        // this.setState({
        //     show: 2
        // })
        console.log('componentDidUpdate')
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    render() {
        if (!this.state.show) {
            return null
        }

        return (
            <div styleName="u-tip">
                {this.state.content}
            </div>
        )
    }
}

let timer
function delay(timeout) {
    return new Promise(resolve => {
        timer = setTimeout(resolve, timeout)
    })
}

function hide() {
    instance.setState({
        show: false
    })
}

async function show(content = '', duration = 2000) {
    instance.setState({
        show: true,
        content: content
    })

    clearTimeout(timer)
    await delay(duration)

    hide()
}

export default {
    element: <Toast />,
    show,
    hide
}
