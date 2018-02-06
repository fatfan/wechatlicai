import React, { Component } from 'react'

const STATUS_INITIAL = 0
const STATUS_MOVE_X = 1
const STATUS_MOVE_Y = 2

const MOVE_THRESHOLD = 20

export default class GestureDetector extends Component {
    status = STATUS_INITIAL

    handleTouchStart = (e) => {
        const touch = e.touches[0]
        this.x = touch.pageX
        this.y = touch.pageY
    }

    handleTouchMove = (e) => {
        const { onStartX, onStartY, onMoveX, onMoveY } = this.props

        const touch = e.touches[0]
        let x = touch.pageX - this.x
        let y = touch.pageY - this.y

        switch (this.status) {
            case STATUS_INITIAL:
                e.preventDefault()

                if (Math.abs(x) > MOVE_THRESHOLD) {
                    this.status = STATUS_MOVE_X

                    if (typeof onStartX === 'function') {
                        onStartX(e)
                    }
                } else if (Math.abs(y) > MOVE_THRESHOLD) {
                    this.status = STATUS_MOVE_Y

                    if (typeof onStartY === 'function') {
                        onStartY(e)
                    }
                }
                break
            case STATUS_MOVE_X:
                if (typeof onMoveX === 'function') {
                    onMoveX(x, e)
                }
                break
            case STATUS_MOVE_Y:
                if (typeof onMoveY === 'function') {
                    onMoveY(y, e)
                }
                break
        }
    }

    handleTouchEnd = (e) => {
        const { onEndX, onEndY } = this.props

        switch (this.status) {
            case STATUS_MOVE_X:
                if (typeof onEndX === 'function') {
                    onEndX(e)
                }
                break
            case STATUS_MOVE_Y:
                if (typeof onEndY === 'function') {
                    onEndY(e)
                }
                break
        }

        this.status = STATUS_INITIAL
    }

    render() {
        const { children, onStartX, onStartY, onMoveX, onMoveY, onEndX, onEndY, ...props } = this.props

        return (
            <div onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}
                onTouchCancel={this.handleTouchEnd}
                {...props}>
                {this.props.children}
            </div>
        )
    }
}
