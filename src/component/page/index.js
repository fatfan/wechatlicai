import React from 'react'

import './index.less'

export function Page({ children, className, ...props }) {
    return (
        <div className={className} styleName="page" {...props}>
            {children}
        </div>
    )
}

export { default as Main } from './main'
export { default as List } from './list'
export { default as Header } from './header'
