import React, { Component } from 'react'

import Mask from 'src/component/mask'

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

export default class StepOnePopup extends Component {
    state = {
        buttonEnabled: false,
        value: '',
        interset: undefined
    }

    onValueChange = (e) => {
        const value = e.target.value.replace(/\D/g, '')

        if (value === '') {
            this.setState({
                buttonEnabled: false,
                value: '',
                interset: undefined
            })
            return
        }

        const number = parseInt(value)
        if (number === 0) {
            this.setState({
                buttonEnabled: false,
                value,
                interset: undefined
            })
        }

        this.setValue(number)
    }

    setValue(value) {
        const { content } = this.props

        this.setState({
            buttonEnabled: true,
            value,
            interset: toString(truncate(calculateInterset(value, 0, content), 2))
        })
    }

    onAllClick = () => {
        this.setValue(100)
    }

    render() {
        const { content, account } = this.props

        const usable = account ? parseFloat(account.accUsable).toLocaleString() : '0.00'

        const noviceUsable = account && parseInt(account.noviceAvailAmount).toLocaleString()

        return (
            <Mask>
                <div styleName="popup">
                    <div styleName="popup-title">输入金额</div>
                    <div styleName="popup-close" onClick={this.props.onBack} />
                    <div styleName="popup-content">
                        <div styleName="input">
                            <input type="tel" id="input-number" pattern="[0-9]+" placeholder="100的整数倍" value={this.state.value} onChange={this.onValueChange} />
                            <div styleName="invest-all" onClick={this.onAllClick}>余额全投</div>
                        </div>
                        <div styleName="line">
                            <div>
                                <span>预期收益：</span>
                                <span styleName="value">{this.state.interset || '0.00'}</span>
                                <span>元</span>
                            </div>
                            <div>
                                <span>账户余额：</span>
                                <span styleName="value">{usable}</span>
                                <span>元</span>
                            </div>
                        </div>
                        <div styleName="line">
                            <div>
                                <span>剩余可投：</span>
                                <span styleName="value">0.00</span>
                                <span>元</span>
                            </div>
                            {
                                content && content.noviceTenderStatus !== 0 &&
                                <div>新手额度：{noviceUsable}元</div>
                            }
                        </div>
                        <div styleName="bottom-button" disabled={!this.state.buttonEnabled}>立即支付</div>
                    </div>
                </div>
            </Mask>
        )
    }
}
