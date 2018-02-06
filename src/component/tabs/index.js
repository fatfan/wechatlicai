import React, { PureComponent, Component } from 'react'
import { withRouter, matchPath } from 'react-router-dom'

import Flex from 'src/component/flex'
import GestureDetector from 'src/component/gesture-detector'

import './index.less'

const TRANSITION = `all .2s ease-in-out`

class LazyContent extends Component {
    constructor(props) {
        super(props)

        this.state = this.computeState(props)
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.computeState(nextProps))
    }

    computeState(props) {
        if (this.state && this.state.match) {
            return {}
        }

        if (props.match) {
            return { match: props.match }
        }

        return {}
    }

    render() {
        const { match } = this.state
        const { children } = this.props

        return (
            <Flex grow column basis={0}>{match && children}</Flex>
        )
    }
}

export class TabsInternal extends PureComponent {
    constructor(props) {
        super(props)

        this.state = this.computeState(props)
        this.state.move = 0
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.computeState(nextProps))
    }

    computeState(props) {
        const {
            height,
            style = {},
            children,
            match
        } = props

        if (typeof height === 'number') {
            style.height = height / 100 + 'rem'
            style.lineHeight = style.height
        }

        let tabs = []
        let title
        let content = []
        let index
        let count = 0
        React.Children.forEach(children, (child, i) => {
            let to = child.props.to
            if (typeof to === 'string') {
                to = {
                    path: to,
                    exact: child.props.exact
                }
            }

            if (matchPath(match.url, to)) {
                tabs.push(React.cloneElement(child, { key: i, active: true }))
                content.push(<LazyContent key={i} match={match}>{child.props.children}</LazyContent>)
                title = child.props.title
                index = i
            } else {
                tabs.push(React.cloneElement(child, { key: i }))
                content.push(<LazyContent key={i}>{child.props.children}</LazyContent>)
            }
            count++
        })

        return {
            style,
            tabs,
            title,
            index,
            count,
            content
        }
    }

    handleMove = (delta, e) => {
        this.width = e.currentTarget.clientWidth

        const { index, count } = this.state
        const min = (count - index - 1) * -this.width
        const max = index * this.width

        if (delta < min) {
            delta = min
        }
        if (delta > max) {
            delta = max
        }

        this.setState({
            move: delta
        })
    }

    handleEnd = () => {
        const index = this.state.index - Math.round(this.state.move / this.width)
        this.setState({
            move: 0
        })
        this.props.history.replace(this.state.tabs[index].props.to)
    }

    render() {
        const {
            width
        } = this

        const {
            className,
            bottom,
            indicator
        } = this.props

        const {
            style,
            tabs,
            index,
            count,
            move,
            title,
            content
        } = this.state

        const indicatorStyle = {
            width: 100 / count + '%',
            transform: `translateX(${index * 100}%) translateX(${move !== 0 ? (-move / width * 100) : 0}%)`,
            transition: move === 0 ? TRANSITION : ''
        }

        const contentStyle = {
            width: 100 * count + '%',
            transform: `translateX(${-100 * index / count}%) translateX(${move}px)`,
            transition: move === 0 ? TRANSITION : ''
        }

        const tabbar = (
            <Flex className={className} styleName="tab-bar" style={style}>
                {tabs}
                {indicator &&
                    <div styleName="indicator" style={indicatorStyle}>
                        <span>{title}</span>
                    </div>}
            </Flex>)

        return (
            <Flex column grow>
                {!bottom && tabbar}
                <GestureDetector styleName="content" onMoveX={this.handleMove} onEndX={this.handleEnd}>
                    <Flex grow style={contentStyle}>
                        {content}
                    </Flex>
                </GestureDetector>
                {bottom && tabbar}
            </Flex>
        )
    }
}

export const Tabs = withRouter(TabsInternal)

export { default as Tab } from './tab'
