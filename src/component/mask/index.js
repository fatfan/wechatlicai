import React from 'react'

import './index.less'

export default function Mask({ children }) {
    return (
        <div styleName="mask">
            {children}
        </div>
    )
}
