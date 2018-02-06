import React from 'react'
import { Link } from 'react-router-dom'

import './index.less'

export default function Button({ className, width = 750, height = 88, style = {}, round, disabled, to, replace, onClick, children }) {
    if (typeof width === 'number') {
        style.width = width / 100 + 'rem'
    }

    if (typeof height === 'number') {
        style.height = height / 100 + 'rem'
        style.lineHeight = style.height
    }

    const content = <div className={className} styleName="button" style={style} round={round + ''} disabled={disabled} onClick={!disabled ? onClick : undefined}>{children}</div>

    if (!disabled && to) {
        return <Link to={to} replace={replace}>{content}</Link>
    } else {
        return content
    }
}
