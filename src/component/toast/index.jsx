import React, { Component } from 'react'

import './index.less'

// export default function Toast({ children }) {
//     return (
//         <div styleName="u-tip">
//             {children}
//         </div>
//     )
// }

export default class Index extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            duation: 3000,
            show: 0
        }
        console.log('constructor')
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    componentDidMount() {
        this.timmer = setTimeout(() => {
            this.setState({
                show: 1
            })
        }, this.state.duation)
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
        clearTimeout(this.timer)
        this.setState({
            show: 0
        })
        console.log('componentWillUnmount')
    }

    render() {
        if (this.state.show === 1) {
            return null
        }
        return (
            <div styleName="u-tip">
                {this.props.children}
            </div>
        )
    }
}
