import React, { Component } from 'react'
// import reactDOM, { render } from 'react-dom'
// import 'whatwg-fetch';
// import 'axios';
import fetch from 'isomorphic-fetch'

import './index.less'

import { Page, Header, Main } from 'src/component/page'
import Toast from 'src/component/toast'

export default class Index extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            username: '',
            password: '',
            enableLogin: false
        }
    }
    componentDidMount() {
        document.documentElement.style.background = '#fff'
    }

    doLogin = (e) => {
        console.log(
            'dologin called...'
        )

        var data = 'username=' + this.state.username + '&password=' + this.state.password

        fetch('/wechatlicai/src/datapi/login.cgi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // crossDomain: true,
            // xhrFields: { withCredentials: true },
            // withCredentials: true,
            credentials: 'include',
            body: data
        })
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error('Bad response from server')
                }
                return response.json()
            })
            .then(function(rslt) {
                console.log(rslt)
                if (rslt.code !== 200) {
                    console.log('用户名或密码错误')
                } else {
                    console.log('登录成功')
                    window.location.href = '#/mine'
                }
            })
    }

    handleChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
            // enableLogin: !!this.refs["username"].value && !!this.refs["password"].value,
            enableLogin: !!e.target.value && !!this.state.password
        })
        // console.log(this.refs["username"].value + " " + this.refs["password"].value)
    }
    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value,
            enableLogin: !!this.state.username && !!e.target.value
        })
        // console.log(this.refs["username"].value + " " + this.refs["password"].value)
    }

    render() {
        return (
            <Page styleName='page' className="g-wp">
                <Header title="注册" backUrl="/" />
                <Main>
                    <div>
                        <div styleName="m-firstStep" className="J_step1">
                            <div styleName="m-logo icon-logo">&#xe610;</div>
                            <p styleName="m-message">新用户注册领取188元红包</p>
                            <div styleName="m-username">
                                <label htmlFor="username">手机号码</label>
                                <input type="text" name="username" autoComplete="off" id="username" maxLength="11" pattern="[0-9]*" />
                                <em styleName="icon-close" id="J_close">&#xe60b;</em>
                            </div>
                            <a href="javascript:;" type="text" styleName="u-btn disable" ref={el => { this.J_nextStep = el }} >下一步</a>
                            <p styleName="u-skip">已有账号？<a href="#login" ref={el => { this.J_login = el }} >立即登录</a></p>
                            <div styleName="m-accept">
                                <em>&#xe608;</em>
                                <span>我已阅读并且同意<a href="serviceAgreement.html" ref={el => { this.J_linkBtn = el }} >《爱贷网服务协议》</a></span>
                            </div>
                        </div>
                        <div styleName="m-autocomplete">
                            <input type="text" name="" />
                            <input type="password" name="" />
                        </div>
                        <div styleName="m-nextStep" style={{ 'display': 'none' }} ref={el => { this.J_step2 = el }} >
                            <p styleName="u-phonecode">我们已发送短信验证码至<span id="J_phoneNum" /></p>
                            <div styleName="m-input">
                                <div styleName="valicode">
                                    <label htmlFor="valicode">验证码</label>
                                    <input type="text" id="J_valicode" placeholder="输入验证码" name="registerSn" autoComplete="off" style={{ 'width': '3.3rem' }} />
                                    <a href="javascript:;" styleName="u-valicode">获取验证码</a>
                                    <span id="J_recTime" styleName="u-time" style={{ 'display': 'none' }}><b id="J_lasttime" /></span>
                                </div>
                                <div styleName="password">
                                    <label htmlFor="password">设置密码</label>
                                    <input type="password" placeholder="8~16位数字、字母组合" id="J_password" name="password" autoComplete="off" />
                                    <em styleName="icon-eye" id="J_eye">&#xe60d;</em>
                                    <em styleName="icon-eye" id="J_eyeopen" style={{ 'display': 'none' }}>&#xe60e;</em>
                                </div>
                            </div>
                            <div styleName="invitor">
                                <label htmlFor="valicode">推荐码</label>
                                <input type="text" id="J_invitor" placeholder="输入推荐人用户名(选填)" autoComplete="off" />
                            </div>
                            <a href="javascript:;" type="text" styleName="u-btn disable" id="J_regSubmit">注册</a>
                        </div>
                    </div>
                </Main>
                { Toast.init('aaa') }
            </Page>
        )
    }
}
