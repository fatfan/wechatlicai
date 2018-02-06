import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import styles from './index.less'

export default function Tab({ className = styles['default-tab'], activeClassName = styles['default-active'], to, title, active, exact, ...props }) {
    return (
        <Link className={cx(className, { [activeClassName]: active })} styleName="tab" to={to} replace {...props}>
            {title}
        </Link >
    )
}
