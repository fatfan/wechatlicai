import React, { PureComponent } from 'react'

import PullToRefresh from 'src/component/pull-to-refresh'

function EndMessage() {
    return (
        <p>没有更多了</p>
    )
}

export default class List extends PureComponent {
    constructor(props) {
        super(props)

        this.page = 0
    }

    state = {
        list: [],
        ended: false
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.load(true)
        }
    }

    componentWillUnmount() {
        this.unmount = true
    }

    reload = () => {
        this.load(true)
    }

    load = async (clear) => {
        const { load, param } = this.props
        if (typeof load !== 'function') {
            return
        }

        if (clear) {
            this.page = 0
        }

        try {
            const { list, ended } = await load(this.page, param)
            this.page++

            if (!this.unmount) {
                this.setState({
                    list: clear ? list : this.state.list.concat(list),
                    ended
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

    render() {
        const {
            className,
            footer = <EndMessage />,
            style,
            children
        } = this.props
        const { list, ended } = this.state

        return (
            <PullToRefresh className={className} reload={this.reload} load={!ended && this.load} style={style}>
                {list.map((item, index) => typeof children === 'function' ? children(item, index) : React.cloneElement(React.Children.only(children), { item, index }))}
                {ended && footer}
            </PullToRefresh>
        )
    }
}
