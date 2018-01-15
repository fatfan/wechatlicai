import React, { Component } from 'react'

import './index.less'

const TYPE_MAP = {
    'number': {
        type: 'tel',
        pattern: '\\d+'
    },
    'password': {
        type: 'password'
    }
}

export default class Input extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: props.value || ''
        }
    }

    onChange = (e) => {
        const { type, onChange } = this.props

        let value = e.target.value
        if (type === 'number') {
            value = value.replace(/[^0-9]/g, '')
        }

        if (value !== this.state.value) {
            this.setState({
                value
            })

            if (typeof onChange === 'function') {
                onChange(value)
            }
        }
    }

    render() {
        const { type, placeholder } = this.props
        const { value } = this.state

        return (
            <input styleName="input" onChange={this.onChange} placeholder={placeholder} {...TYPE_MAP[type]} value={value} />
        )
    }
}
