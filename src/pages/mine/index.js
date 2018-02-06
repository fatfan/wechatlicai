import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import fetch from 'isomorphic-fetch'

import request from 'src/lib/request'

import AppSwitch from 'src/component/app-switch'
import { Header, Main } from 'src/component/page'

import Userinfo from './userinfo/index'
import Coupon from './coupon/list.jsx'
import Collect from './collect/list.jsx'
import Balance from './balance/detail.jsx'
import Withdraw from './balance/withdraw.jsx'
import Earnings from './earnings/earnings.js'
import TotalAssets from './earnings/totalAssets.js'

import './mine.less'
var names = ['普通', '铁牌', '铜牌', '银牌', '金牌', '白金', '至尊']
export class Mine extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            username: ''
        }
    }
    async componentDidMount() {
        // var startX
        // var finishX
        var that = this
        fetch('/wechatlicai/src/datapi/accountInfo.cgi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // xhrFields: { withCredentials: true },
            credentials: 'include',
            body: ''
        })
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error('Bad response from server')
                }
                return response.json()
            })
            .then(function(rslt) {
                console.log(rslt)
                if (rslt) {
                    if (rslt.code === 401) {
                        window.location.href = '/wechatlicai/#/login'
                        return
                    }
                    that.setState({
                        userId: rslt.userId,
                        username: rslt.username
                    })
                }
            })
        try {
            const response = await request('mine/mineAccountAccDataService')
            this.setState({ ...response })
        } catch (err) {

        }
        try {
            const response = await request('mine/userVipstatusService')
            this.setState({ ...response })
        } catch (err) {

        }
    }
     checkClick = async () => {
         try {
             const response = await request('mine/signInService')
             if (response.returnCode === 1) {
                 this.setState({
                     'siginStatus': '1'
                 })
             }
         } catch (err) {

         }
     }
     render() {
         return (
             <React.Fragment>
                 <Header title="个人中心" noBack />

                 <Main>
                     <Link to='/mine/userinfo' styleName="user-info">
                         <img styleName="avatar" />
                         <div styleName="username">{this.state.username ? this.state.username : '---'}</div>
                         <div styleName="icon-1 vip">{names[this.state.memberGrade - 1] || '普通' }会员</div>
                         <div styleName="check-in" disabled={this.state.siginStatus === '1' ? 'disabled' : ''} onClick={this.checkClick} >{this.state.siginStatus === '1' ? '已签到' : '签到'}</div>

                         <i styleName="icon-1 icon-right-arrow" />
                     </Link>

                     <Link styleName="section-asset" to="/mine/earnings/totalAssets">
                         <span>总资产 (元)</span>
                         <span styleName="value">{this.state.accTotal ? this.state.accTotal : '---'}</span>

                         <i styleName="icon-1 icon-right-arrow" />
                     </Link>

                     <section styleName="menu menu-slim">
                         <a href="balance/recharge.html?payment=lianlianWapPrepositPlugin" styleName="menu-item menu-item-recharge">
                             <i styleName="icon-recharge" />
                             <span>充值</span>
                         </a>
                         <Link to="/mine/balance/withdraw" styleName="menu-item">
                             <i styleName="icon-withdraw" />
                             <span>提现</span>
                         </Link>
                     </section>

                     <section styleName="menu">
                         <div styleName="menu-row">
                             <Link styleName='menu-item' to="/mine/balance/detail">
                                 <i styleName="icon-1 icon-balance" />
                                 <p styleName="title">账户余额</p>
                                 <p styleName="subtitle">{this.state.accUsable ? this.state.accUsable : '---'}</p>
                             </Link>

                             <Link styleName='menu-item' to="/mine/collect/list">
                                 <i styleName="icon-1 icon-collect" />
                                 <p styleName="title">待收总额</p>
                                 <p styleName="subtitle">{this.state.accCollection ? this.state.accCollection : '---'}</p>
                             </Link>
                         </div>

                         <div styleName="menu-row">
                             <a href="autoTender/index.html" styleName="menu-item">
                                 <i styleName="icon-auto-tender" />
                                 <p styleName="title">自动投标</p>
                                 <p styleName="subtitle">优先匹配 智能投标</p>
                             </a>

                             <Link to="/mine/earnings/earnings" styleName="menu-item">
                                 <i styleName="icon-1 icon-earning" />
                                 <p styleName="title">累计收益</p>
                                 <p styleName="subtitle">良好的理财习惯</p>
                             </Link>
                         </div>
                     </section>

                     <section styleName="menu">
                         <div styleName="menu-row">
                             <a href="https://wechat.cnaidai.com/webchat/activity/inviteFriends/index.html" styleName="menu-item">
                                 <i styleName="icon-money" />
                                 <p styleName="title">我要赚钱</p>
                                 <p styleName="subtitle">邀请好友</p>
                             </a>
                             <Link styleName='menu-item' to="/mine/coupon/list">
                                 <i styleName="icon-1 icon-coupon" />
                                 <span>我的优惠券</span>
                                 <i styleName="point-nouse" />
                             </Link>
                         </div>
                     </section>
                 </Main>
             </React.Fragment >
         )
     }
}

export function MineRouter({ match }) {
    return (
        <AppSwitch>
            <Route exact path={match.url} component={Mine} />
            <Route path={`${match.url}/collect/list`} component={Collect} />
            <Route path={`${match.url}/coupon/list`} component={Coupon} />
            <Route path={`${match.url}/balance/detail`} component={Balance} />
            <Route path={`${match.url}/balance/withdraw`} component={Withdraw} />
            <Route path={`${match.url}/earnings/earnings`} component={Earnings} />
            <Route path={`${match.url}/userinfo`} component={Userinfo} />
            <Route path={`${match.url}/earnings/totalAssets`} component={TotalAssets} />
        </AppSwitch>
    )
}
