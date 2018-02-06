import React from 'react'

import Flex from 'src/component/flex'

import './index.less'

export function Page({ children, className, ...props }) {
    return (
        <Flex column className={className} styleName="page" {...props}>
            {children}
        </Flex>
    )
}

export { default as Main } from './main'
export { default as List } from './list'
export { default as Header } from './header'
