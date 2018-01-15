import React, { PureComponent } from 'react'

import { rem2px } from 'src/lib/flexible'

import './index.less'

const INDECATOR_TEXT = [
    '6年，看得见的安全',
    '暖心金融，普惠未来',
    '合规合法，放心理财'
]

const INDICATOR_HEIGHT = rem2px(2 * 0.88)

export default class PullDownIndicator extends PureComponent {
    render() {
        const { loading, distance } = this.props

        if (loading) {
            return (
                <div styleName="indicator" >
                    {this.text}
                    <div styleName="rotator animating" />
                </div>
            )
        }

        const rotate = distance / INDICATOR_HEIGHT * 180
        const rotatorStyle = {
            transform: `rotateY(${rotate}deg)`
        }

        if (distance === 0) {
            const index = Math.floor(Math.random() * INDECATOR_TEXT.length)
            this.text = INDECATOR_TEXT[index]
        }

        return (
            <div styleName="indicator">
                {this.text}
                <div styleName="rotator" style={rotatorStyle} />
            </div>
        )
    }
}
