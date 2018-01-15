import React, { Component } from 'react'
import { Link, withRouter, matchPath } from 'react-router-dom'

import styles from './index.less'

class TabInternal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            active: this.match(props)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            active: this.match(nextProps)
        })
    }

    match(props) {
        let to = props.to
        if (typeof to === 'string') {
            to = {
                path: to,
                exact: props.exact
            }
        }

        return matchPath(props.match.url, to)
    }

    handleRef = (e) => {
        this.element = e
    }

    render() {
        const {
            className = styles['default-tab'],
            activeClassName = styles['default-active'],
            to,
            header
        } = this.props

        return (
            <Link className={`${className} ${this.state.active && activeClassName}`} styleName="tab" to={to} replace>
                <span ref={this.handleRef}>
                    {header}
                </span>
            </Link>
        )
    }
}

export const Tab = withRouter(TabInternal)

function handleTouchMove(e) {
    e.preventDefault()
}

export class TabBar extends Component {
    state = {}

    handleActive = (style) => {
        this.setState(style)
    }

    render() {
        const { className, height, style = {}, indicator, children } = this.props

        if (height !== undefined) {
            style.height = height / 100 + 'rem'
        }

        return (
            <nav className={className} styleName="tab-bar" style={style} onTouchMove={handleTouchMove}>
                {React.Children.map(children, (child) => React.cloneElement(child, { onActive: this.handleActive }))}
                {indicator && <div styleName="indicator" style={this.state} />}
            </nav>
        )
    }
}
