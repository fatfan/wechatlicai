import React, { Component } from 'react'
import request from 'src/lib/request'
import { Page, Header, Main } from 'src/component/page'
import { Route, Link } from 'react-router-dom'
import AppSwitch from 'src/component/app-switch'
import Qrcode from './qrcode'
import Nameverify from './nameverify'
import Phoneverify from './phoneverify'
import './index.less'
const bankName = {
    300: '工商银行',
    301: '中国银行',
    302: '建设银行',
    303: '农业银行',
    463: '交通银行',
    465: '广发银行',
    466: '招商银行',
    467: '平安银行',
    468: '兴业银行',
    469: '民生银行',
    470: '华夏银行',
    472: '中信银行',
    473: '光大银行',
    1596: '邮政银行',
    1684: '杭州银行',
    1821: '北京银行',
    1888: '上海银行',
    4243: '浙商银行'
}
const realStatus = {
    2: '审核中',
    3: '审核中'
}
class Userinfo extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
        }
    }
    async componentDidMount() {
        try {
            const response = await request('mine/userInfoDataService')
            this.setState({ ...response })
        } catch (err) {

        }
    }
    render() {
        return (
            <Page>
                <Header title="账户详情"/>
                <Main>
                    <section styleName='m-detail'>
                        <div styleName='m-item u-username'>
                            <p styleName='f-fl'>{this.state.username ? this.state.username : '-'}</p>
                            <div styleName='u-userImg f-fr'>
                                <img src='https://icdn.cnaidai.com/aidai/webchat/static/img/mine/userImg.png' id='userPic'/>
                            </div>
                        </div>
                        <div styleName='m-item'>
                            <Link to='/mine/userinfo/qrcode'>
                                <p styleName='f-fl'>我的二维码</p>
                            </Link>
                        </div>
                        <div styleName='m-item'>
                            <Link to='/mine/userinfo/phoneverify'>
                                <p styleName='f-fl'>手机认证</p>
                                <span styleName='f-fr'>{this.state.phoneStatus && this.state.phoneStatus === '1' ? this.state.phone && this.state.phone.substring(0, 3) + '****' + this.state.phone.substring(7, 11) : '未认证'}</span>
                            </Link>
                        </div>
                        <div styleName='m-item'>
                            <Link to='/mine/userinfo/nameverify'>
                                <p styleName='f-fl'>实名认证</p>
                                <span styleName='f-fr'>{this.state.realStatus && this.state.realStatus === '1' ? this.state.realName : realStatus[this.state.realStatus]}</span>
                            </Link>
                        </div>
                        <div styleName='m-item'>
                            <Link to='/mine/userinfo/nameverify'>
                                <p styleName='f-fl'>身份证号</p>
                                <span styleName='f-fr'>{this.state.realStatus && this.state.realStatus === '1' ? this.state.cardId : realStatus[this.state.realStatus]}</span>
                            </Link>
                        </div>
                        <div styleName='m-item'>
                            <a href='javascript:'>
                                <p styleName='f-fl'>银行卡号</p>
                                <span styleName='f-fr'><i>{bankName[this.state.bankId]}</i>(尾号{this.state.bank && this.state.bank.substring(this.state.bank.length - 4, this.state.bank.length)}<i/>)</span>
                            </a>
                        </div>
                    </section>
                    <section styleName='m-explain'>
                        <p>如需更换已认证的银行卡</p>
                        <p>请联系客服：<span>400-888-6365</span></p>
                        <p>（工作时间:09:00-21:00）</p>
                    </section>
                </Main>
            </Page>
        )
    }
}
const UserInfoRouter = ({ match }) => (
    <AppSwitch>
        <Route exact path={match.url} component={Userinfo} />
        <Route path={`${match.url}/qrcode`} component={Qrcode} />
        <Route path={`${match.url}/nameverify`} component={Nameverify} />
        <Route path={`${match.url}/phoneverify`} component={Phoneverify} />
    </AppSwitch>
)
export default UserInfoRouter
