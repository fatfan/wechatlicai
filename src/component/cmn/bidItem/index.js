import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import BidItemTitle from './title'

import './index.less'

export default class BidItem extends PureComponent {
    state = {
        animate: false
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                animate: true
            })
        }, 100)
    }

    componentWillReceiveProps() {
        this.setState({
            animate: false
        })
    }

    componentDidUpdate(prevProps, prevState) {
        setTimeout(() => {
            this.setState({
                animate: true
            })
        }, 0)
    }

    toTruncatedFixed = (number, digits) => {
        var pow = Math.pow(10, digits)
        return (Math.floor(number * pow) / pow).toFixed(digits)
    }

    render() {
        return (
            <Link styleName={`list-item ${this.props.className ? this.props.className : ''}`} to={`/invest/${this.props.id}`}>
                <BidItemTitle {...this.props} />

                <div styleName='properties'>
                    <div styleName='property interest'>
                        <div styleName='value'>{this.toTruncatedFixed(this.props.apr, 1)}<span styleName='unit'>%</span></div>
                        <div styleName='name'>预期年化</div>
                    </div>
                    {
                        (this.props.bidType && this.props.bidType === 1) ? ( // 首页的第一个标的bidType =1
                            <div>
                                <div styleName='property remain'>
                                    <div styleName='inline-name'>剩余</div>
                                    <div styleName='value'>{this.props.account - this.props.accountYes}<span styleName='unit'>元</span></div>
                                </div>

                                <div styleName='property time'>
                                    <div styleName='name'>期限</div>
                                    <div styleName='value'>{this.props.timeLimit}<span styleName='unit'>个月</span></div>
                                </div>
                            </div>
                        ) : (
                            <div styleName='property'>
                                <div styleName='value'>{this.props.timeLimit}<span styleName='unit'>个月</span></div>
                                <div styleName='name'>项目期限</div>
                            </div>
                        )
                    }

                    {(this.props.listType && this.props.listType === 1) && ( // 首页和列表页面 的区别 listType = 1
                        <div styleName='property'>
                            <div styleName='value'>{this.props.lowestAccount}<span styleName='unit'>元</span></div>
                            <div styleName='name'>起投金额</div>
                        </div>
                    )}

                </div>
                {
                    (this.props.listType && this.props.listType === 1) ? (
                        <div styleName='progress'>
                            <div styleName='value'>{this.toTruncatedFixed(this.props.scales * 100, 0)}%</div>
                            <svg viewBox='0 0 80 80'>
                                <circle stroke='#dddddd' strokeWidth='3' fill='transparent' r='36' cx='40' cy='40' />
                                <circle styleName={`progress-ring ${this.state.animate ? 'animate' : 'stop'}`} stroke='#FF5A56' strokeWidth='3' fill='transparent' r='36' cx='40' cy='40' style={{ 'strokeDasharray': '226.19 226.19', 'strokeDashoffset': (1 - this.props.scales) * 226.19 }} />
                            </svg>
                        </div>
                    ) : (
                        <div styleName='button'>立即投资</div>
                    )
                }
            </Link >
        )
    }
}

export { BidItemTitle }
