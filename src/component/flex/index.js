import React from 'react'

import './index.less'

function parseFlex(input) {
    if (input === true) {
        return 1
    }

    if (typeof input === 'string') {
        input = parseFlex(input)

        if (isNaN(input)) {
            return 0
        }

        return input
    }

    if (typeof input !== 'number') {
        return 0
    }

    return input
}

export default function Flex({ className, inline, column, reverse, wrap, alignItems, justifyContent, alignContent, grow, shrink, basis, style, children, ...props }) {
    if (wrap === true) {
        wrap = 'wrap'
    } else if (wrap === 'reverse') {
        wrap = 'wrap-reverse'
    } else if (typeof wrap !== 'string') {
        wrap = ''
    }

    grow = parseFlex(grow)
    shrink = parseFlex(shrink)

    style = {
        ...style,
        display: inline ? 'inline-flex' : 'flex',
        flexDirection: (column ? 'column' : 'row') + (reverse ? '-reverse' : ''),
        flexWrap: wrap,
        alignItems,
        justifyContent,
        alignContent,
        flexGrow: grow,
        flexShrink: shrink,
        flexBasis: basis
    }

    return (
        <div className={className} styleName="flex" style={style} {...props}>
            {children}
        </div>
    )
}
