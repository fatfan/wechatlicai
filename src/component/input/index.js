import React, { Component } from 'react'

import Flex from 'src/component/flex'

import './index.less'

const TYPE_MAP = {
    'number': {
        type: 'tel'
    },
    'integer': {
        type: 'tel'
    },
    'password': {
        type: 'password'
    }
}

function match(value, regex) {
    const result = value.match(regex)
    if (result === undefined) {
        return undefined
    }
    if (Array.isArray(result)) {
        return result[0]
    }

    return result
}

export default class Input extends Component {
    id = 'input-' + Date.now()

    onChange = (e) => {
        const { type, onChange } = this.props

        let value = e.target.value
        if (type === 'integer') {
            value = match(value, /\d+/g)
        } else if (type === 'number') {
            value = match(value, /\d+(\.\d{0,2})?/g)
        }

        if (value !== this.props.value) {
            if (typeof onChange === 'function') {
                onChange(value)
            }
        }
    }

    render() {
        const { id } = this
        const { className, height = 98, fontSize = 32, style = {}, type = 'text', placeholder, value, children } = this.props

        if (typeof height === 'number') {
            style.height = height / 100 + 'rem'
            style.lineHeight = style.height
        }

        if (typeof fontSize === 'number') {
            style.fontSize = fontSize / 100 + 'rem'
        }

        return (
            <Flex className={className} grow style={style}>
                <label htmlFor={id}>{children}</label>
                <input id={id} styleName="input" onChange={this.onChange} placeholder={placeholder} {...TYPE_MAP[type]} value={value || ''} autoComplete="off" spellCheck="false" />
            </Flex>
        )
    }
}
