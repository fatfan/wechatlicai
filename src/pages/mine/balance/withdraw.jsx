import React, { Component } from 'react'
import request from 'src/lib/request'
import { Route } from 'react-router-dom'
import Mask from 'src/component/mask'
import { Page, Header, Main } from 'src/component/page'
import withProps from 'src/component/with-props'
import Input from 'src/component/input'
// 引入样式
import './withdraw.less'
const bankClass = {
    300: 'u-bank9',
    301: 'u-bank13',
    302: 'u-bank15',
    303: 'u-bank19',
    463: 'u-bank14',
    465: 'u-bank2',
    466: 'u-bank18',
    467: 'u-bank8',
    468: 'u-bank10',
    469: 'u-bank16',
    470: 'u-bank6',
    472: 'u-bank11',
    473: 'u-bank12',
    1596: 'u-bank7',
    1684: 'u-bank4',
    1821: 'u-bank5',
    1888: 'u-bank3',
    4243: 'u-bank1'
}
function fmtRe(nameStr) {
    if (nameStr !== undefined) {
        if (nameStr.length > 4) {
            nameStr = '**' + nameStr.substring(nameStr.length - 4, nameStr.length)
        } else {
            nameStr = '**' + nameStr.substr(-1, 1)
        }
    } else {
        nameStr = '**'
    }
    return nameStr
}
function submitPopup({ history, value, phone }) {
    // if (value === '') {
    //     history.goBack()
    //     return null
    // }

    return (
        <Mask>
            <section styleName='m-firsttimePop'>
                <h4>首次提现验证码</h4>
                <p styleName='u-txt'>我们已发送首提验证码到您的手机<i>{phone}</i></p>
                <div styleName='ofh'>
                    <input type='text' name='validCode' id='validCode' placeholder='短信验证码' />
                    <input type='button' styleName='getValidCode' value='获取验证码' disabled />
                    <input type='hidden' id='codeBox' value='' />
                </div>
                <input type='submit' value='确定' />
                <span>为确保提现为注册用户本人操作,首提提现时爱贷网</span>
                <span>会发送首提验证码到注册手机号。如需人工帮助，</span>
                <span>请致电400-888-6365</span>
            </section>
        </Mask>
    )
}

export default class Withdraw extends Component {
    state = {
        index: 0
    }
    async componentDidMount() {
        const result = await request(`mine/balance/getFreeCashService`)
        if (result.code === 0) {
            this.setState({ ...result })
        } else {
            throw new Error()
        }
        const response = await request(`mine/balance/withdrawIndexDataService`)
        if (response.code === 0) {
            this.setState({
                bankList: response.bankList[0],
                isFirstMoney: response.isFirstMoney,
                isUsedNewCoupon: response.isUsedNewCoupon,
                useMoney: response.useMoney
            })
        } else {
            throw new Error()
        }
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
        this.setState({
            value
        })
    }
    allIn= () => {
        const useMoney = this.state.useMoney
        this.setState({
            value: useMoney
        })
    }
    render() {
        return (
            <Page>
                <Header title='提现' />
                <Main>
                    <section styleName='m-mine m-detail m-bankInput s-com-input'>
                        <form id='withdrawForm' target='noReload'>
                            <input type='hidden' />
                            <input type='hidden' name='bankId' val={this.state.bankList && this.state.bankList.bank} />
                            <input type='hidden' name='bankAccount' val={this.state.bankList && this.state.bankList.account} />
                            <div styleName='u-bankInfo'>
                                {this.state.bankList && <em styleName={bankClass[this.state.bankList.bank]} />}
                                <span id='bankName'>{this.state.bankList && this.state.bankList.bankname}</span><span>(尾号 <b id='bankNumb'>{this.state.bankList && fmtRe(this.state.bankList.account)}</b>)</span>
                            </div>
                            <div styleName='input'>
                                <Input type="number" placeholder={this.state.useMoney && this.state.useMoney ? '可提现余额：' + this.state.useMoney + '元' : '可提现余额：0.00元'} value={this.state.value} onChange={this.handleValueChange} height={96} fontSize={32}>
                                    <span>提现金额</span>
                                </Input>
                                <span styleName='all' onClick={this.allIn}>全部</span>
                            </div>
                            <p styleName='u-freeNum'>免费提现额度为：<span id='freeCash'>{this.state.data && this.state.data ? this.state.data : '载入中...'}</span></p>
                            <p styleName='m-submit' to={`${this.props.match.url}/submit`}>下一步</p>
                        </form>
                    </section>
                    <section styleName='m-rule'>
                        <h2 styleName='tc'>提现规则</h2>
                        <div>
                            <h3>1.提现时间</h3>
                            <p>周一至周五15:30之前申请的提现当天支付完成，15:30之后申请的提现下一个工作日支付，周六周日及节假日的提现下一个工作日支付。</p>
                        </div>
                        <div>
                            <h3>2.提现费用</h3>
                            <p>充值15天内(含15天)的提现属于紧急提现，收取提现金额的0.3%作为提现手续费。充值15天后提现免费，精确到秒。</p>
                        </div>
                        <div>
                            <h3>3.计算公式</h3>
                            <p>免费提现额度=充值总额+已赚奖励+已赚利息+已使用抵扣券（或现金券）+罚息金额(逾期款等)+人人赚资金-扣款（包含充值手续费）-借款手续费-借款利息-借款付出奖励-提现总额 -近15天内充值额</p>
                        </div>
                        <div>
                            <h3>4.提现金额</h3>
                            <p>单笔提现金额100元起</p>
                        </div>
                    </section>
                    <section styleName='m-changePayPwd' style={{ 'display': 'none' }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td styleName='u-tipTt'>提示</td>
                                </tr>
                                <tr>
                                    <td>为了您的账户安全，请到设置里面设置您的支付密码。</td>
                                </tr>
                                <tr styleName='u-tipBtn'>
                                    <td width='50%'><a href='javascript:;' id='noSetPwd'>取消</a></td>
                                    <td width='50%'><a href='../userInfo/setPaypwd.html'>去设置</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <section styleName='m-putPayPwd' style={{ 'display': 'none' }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td styleName='u-tipTt'>输入支付密码</td>
                                </tr>
                                <tr>
                                    <td styleName='u-tipIpt'>
                                        <input type='text' name='paypassword' value='' placeholder='请输入支付密码' />
                                        <a href='/webchat/more/retrievePayPassword1.html'>忘记密码?</a>
                                    </td>
                                </tr>
                                <tr styleName='u-tipBtn'>
                                    <td width='50%'><a href='javascript:;' id='noPay'>取消</a></td>
                                    <td width='50%'><a href='javascript:;' styleName='c-red'>确定</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <Route path={`${this.props.match.url}/submit`} render={withProps(submitPopup, this.state)} />
                </Main>
            </Page>
        )
    }
}
