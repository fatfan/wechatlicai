import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

import './index.less'

function handleTouchMove(e) {
    e.preventDefault()
}

class Header extends PureComponent {
    back = () => {
        const { backUrl, history } = this.props

        if (backUrl !== undefined) {
            history.replace(backUrl)
        } else if (history.length > 1) {
            history.goBack()
        } else {
            history.replace('/')
        }
    }

    render() {
        const { noBack, title, children } = this.props

        return (
            <header onTouchMove={handleTouchMove}>
                {!noBack && <div styleName="back" onClick={this.back} />}
                <h1 styleName="title">{title}</h1>
                {children}
            </header>
        )
    }
}

export default withRouter(Header)
