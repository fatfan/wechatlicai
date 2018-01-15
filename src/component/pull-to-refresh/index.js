import React, { PureComponent } from 'react'

import { rem2px } from 'src/lib/flexible'

import PullDownIndicator from 'src/component/pull-to-refresh/pull-down-indicator'
import PullUpIndicator from 'src/component/pull-to-refresh/pull-up-indicator'

import './index.less'

const INDICATOR_HEIGHT = rem2px(2 * 0.88)
const INDICATOR_THREHOLD = rem2px(2 * 0.58)

const BORDER_NONE = 0
const BORDER_TOP = 1
const BORDER_BOTTOM = 1 << 1

const STATUS_NORMAL = 0
const STATUS_TOUCH_START = 1
const STATUS_PULLING = 2
const STATUS_RELEASE_TO_REFRESH = 3
const STATUS_LOADING = 4

const TRANSITION = 'transform .3s ease-in-out'

export default class PullToRefresh extends PureComponent {
    state = {
        status: STATUS_NORMAL,
        distance: 0,
        transition: false
    }

    componentDidMount() {
        this.load()
    }

    componentWillUnmount() {
        this.unmount = true
    }

    async load() {
        try {
            let load
            if (this.border === BORDER_TOP) {
                load = this.props.reload
            } else {
                load = this.props.load
            }

            if (typeof load !== 'function') {
                return
            }

            this.setState({
                status: STATUS_LOADING
            })

            await load()
        } catch (err) {
            console.error(err)
        } finally {
            if (!this.unmount) {
                this.setState({
                    status: STATUS_NORMAL,
                    distance: 0,
                    transition: true
                })
            }
        }
    }

    border = BORDER_TOP

    handleTouchStart = (e) => {
        if (this.state.status !== STATUS_NORMAL) {
            return
        }

        this.border = BORDER_NONE

        const target = e.currentTarget
        const top = target.scrollTop
        if (top === 0) {
            if (typeof this.props.reload === 'function') {
                this.border |= BORDER_TOP
            }
        }

        const height = target.offsetHeight
        if (top + height + 5 >= target.scrollHeight) {
            if (typeof this.props.load === 'function') {
                this.border |= BORDER_BOTTOM
            }
        }

        if (this.border === BORDER_NONE) {
            return
        }

        this.startY = e.touches[0].pageY
        this.setState({
            status: STATUS_TOUCH_START
        })
    }

    handleTouchMove = (e) => {
        if (e.touches.length === 0) {
            return
        }

        const y = e.touches[0].pageY
        switch (this.state.status) {
            case STATUS_TOUCH_START:
                if ((this.border & BORDER_TOP) !== 0) {
                    if (y > this.startY) {
                        e.preventDefault()
                        this.border = BORDER_TOP
                        this.setState({
                            status: STATUS_PULLING
                        })
                        return
                    }
                }

                if ((this.border & BORDER_BOTTOM) !== 0) {
                    if (y < this.startY) {
                        e.preventDefault()
                        this.border = BORDER_BOTTOM
                        this.setState({
                            status: STATUS_PULLING
                        })
                        return
                    }
                }

                this.setState({
                    status: STATUS_NORMAL
                })
                break
            case STATUS_PULLING:
            case STATUS_RELEASE_TO_REFRESH:
                e.preventDefault()
                if (this.border === BORDER_TOP) {
                    if (y > this.startY) {
                        const distance = (y - this.startY) / 3
                        const status = distance > INDICATOR_THREHOLD ? STATUS_RELEASE_TO_REFRESH : STATUS_PULLING
                        this.setState({
                            status,
                            distance,
                            transition: false
                        })
                        return
                    }
                } else {
                    if (y < this.startY) {
                        const distance = -(y - this.startY) / 3
                        const status = distance > INDICATOR_THREHOLD ? STATUS_RELEASE_TO_REFRESH : STATUS_PULLING
                        this.setState({
                            status,
                            distance,
                            transition: false
                        })
                        return
                    }
                }

                this.setState({
                    staus: STATUS_PULLING,
                    distance: 0,
                    transition: false
                })
                break
        }
    }

    handleTouchEnd = (e) => {
        switch (this.state.status) {
            case STATUS_RELEASE_TO_REFRESH:
                this.load()
                break
            case STATUS_PULLING:
                this.setState({
                    status: STATUS_NORMAL,
                    distance: 0,
                    containerStyle: {
                        transition: TRANSITION
                    }
                })
                break
        }
    }

    render() {
        const { border } = this
        const { status, distance, transition } = this.state
        const {
            className,
            reload,
            reloadIndicator: ReloadIndicator = PullDownIndicator,
            children,
            load,
            loadIndicator: LoadIndicator = PullUpIndicator,
            ...props
        } = this.props

        let translate = INDICATOR_HEIGHT
        if (border === BORDER_TOP) {
            translate = Math.min(distance, INDICATOR_HEIGHT) - translate
        } else {
            translate = -Math.min(distance, INDICATOR_HEIGHT) - translate
        }

        const containerStyle = {
            transform: `translateY(${translate}px)`,
            transition: transition ? TRANSITION : ''
        }

        return (
            <div className={className} styleName="pull-container" style={containerStyle}>
                {reload && <ReloadIndicator loading={status === STATUS_LOADING} distance={distance} />}
                <div styleName="content"
                    onScroll={this.handleScroll}
                    onTouchStart={this.handleTouchStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={this.handleTouchEnd}
                    onTouchCancel={this.handleTouchEnd}
                    {...props}>
                    {children}
                </div>
                {load && <LoadIndicator loading={status === STATUS_LOADING} distance={distance} />}
            </div >
        )
    }
}
