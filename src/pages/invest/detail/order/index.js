import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { Page, Header, Main } from 'src/component/page'
import withProps from 'src/component/with-props'
import Flex from 'src/component/flex'
import Input from 'src/component/input'
import Button from 'src/component/button'
import Mask from 'src/component/mask'

import './index.less'

function truncate(number, digits) {
    var pow = Math.pow(10, digits)
    return Math.floor(number * pow) / pow
}

function toString(number) {
    return number.toLocaleString('en-US', { minimumFractionDigits: 2 })
}

function calculateInterset(money, apr, borrow) {
    apr = (parseFloat(borrow.apr) + apr) / 100
    var result
    if (borrow.isday === 1) {
        apr /= 365
        result = money * apr * borrow.timeLimitDay
    } else {
        apr /= 12
        var time = borrow.timeLimit
        switch (borrow.investType) {
            case '到期还本付息': // 2
            case '每月还息到期还本': // 3
                result = money * apr * time
                break
            default:
                result = money * apr * time * Math.pow(1 + apr, time) / (Math.pow(1 + apr, time) - 1) - money
                break
        }
    }
    return result
}

function ConfirmPopup({ history, value, pay }) {
    if (value === '') {
        history.goBack()
        return null
    }

    return (
        <Mask>
            <Flex column styleName="popup">
                <Header title="确认支付" />
                <Main styleName="popup-content">
                    <div styleName="subtotal">￥{toString(value)}</div>
                    <div className="menu">
                        <div className="menu-item">
                            <span>使用优惠券</span>
                            <span className="menu-right">暂无可用券</span>
                        </div>
                        <div className="menu-item">
                            <span>还需支付</span>
                            <span className="menu-right">{toString(pay)}元</span>
                        </div>
                        <div className="menu-item">
                            <span>支付方式</span>
                            <span className="menu-right">余额支付</span>
                        </div>
                    </div>
                </Main>
                <Button height={92}>立即支付</Button>
            </Flex>
        </Mask>
    )
}

export default class Order extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: '',
            pay: 0,
            max: this.calculateMaxInvest(props),
            interset: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            max: this.calculateMaxInvest(nextProps)
        })
    }

    calculateMaxInvest(props) {
        const {
            detail: { getContent: content } = {},
            account: { accUsable: usable } = {}
        } = props

        if (!content || !usable) {
            return 0
        }

        const min = Math.min(parseFloat(content.other), parseFloat(usable))
        return Math.floor(min / 100) * 100
    }

    handleValueChange = (value) => {
        const {
            detail: { getContent: content } = {}
        } = this.props

        this.setState({
            value,
            interset: content ? truncate(calculateInterset(value, 0, content), 2) : 0
        })
    }

    handleInvestAll = () => {
        const {
            detail: { getContent: content } = {}
        } = this.props

        const max = this.state.max
        this.setState({
            value: max,
            interset: truncate(calculateInterset(max, 0, content), 2)
        })
    }

    render() {
        const {
            detail: { getContent: content } = {},
            account
        } = this.props
        const {
            value,
            max,
            interset
        } = this.state

        if (account && account.code !== 0) {
            return <Redirect to="/login" />
        }

        return (
            <Page>
                <Header title="投资确认" />
                <Main>
                    <div styleName="block">
                        <h2>投资金额</h2>

                        <Flex styleName="line">
                            <Input type="integer" placeholder="100的整数倍" value={value} onChange={this.handleValueChange} height={88} fontSize={40}>
                                <span styleName="yuan">￥</span>
                            </Input>
                            {max >= 100 && <div styleName="invest-all" onClick={this.handleInvestAll}>余额全投</div>}
                        </Flex>

                        <Flex styleName="line">
                            <div>剩余可投：{content && parseFloat(content.other).toLocaleString()}元</div>
                            <Flex grow />
                            <div>账户余额：{account && parseFloat(account.accUsable).toLocaleString()}元</div>
                        </Flex>

                        <Flex styleName="line">
                            <div>预期收益：<span styleName="red">{toString(interset)}</span>元</div>
                            <Flex grow />
                        </Flex>
                    </div>

                    <Flex styleName="block coupon">
                        使用优惠券
                        <Flex grow />
                        满<span styleName="red">1000</span>元可使用优惠券
                    </Flex>

                    <Button width={690} style={{ marginTop: '.68rem' }} round disabled={value === ''} to={`${this.props.match.url}/confirm`}>立即支付</Button>
                </Main>

                <Route path={`${this.props.match.url}/confirm`} render={withProps(ConfirmPopup, this.state)} />
            </Page>
        )
    }
}
