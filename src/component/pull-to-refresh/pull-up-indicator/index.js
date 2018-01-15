import React from 'react'

import './index.less'

export default function PullUpIndicator({ loading, distance }) {
    if (loading) {
        return (
            <div styleName="indicator animating">正在加载</div>
        )
    }

    if (distance > 50) {
        return (
            <div styleName="indicator threhold">释放刷新</div>
        )
    }

    return (
        <div styleName="indicator">上拉刷新</div>
    )
}
