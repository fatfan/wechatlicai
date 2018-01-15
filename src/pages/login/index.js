import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

import { Page, Header, Main } from 'src/component/page'

import './index.less'

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
    moveTest = (e) => {

    }
    render() {
        return (
            <Page styleName="page">
                <Header title="登录" backUrl="/"/>
                <Main>
                    <div styleName="g-cnt">
                        <div styleName="icon-logo">&#xe610;</div>
                        <p styleName="m-message">aaa</p>
                        <div styleName="m-login">
                            <div styleName="u-input">
                                <label htmlFor="username">用户名</label>
                                <input type="text" placeholder="请输入用户名/手机号" autoComplete="off" onChange={(e) => { this.handleChangeUsername(e) }} />
                            </div>
                            <div styleName="u-input">
                                <label htmlFor="password">登录密码</label>
                                <input type="password" placeholder="密码" autoComplete="off" onChange={(e) => { this.handleChangePassword(e) }} />
                                <em styleName="icon-eye">&#xe60d;</em>
                                <em styleName="icon-eye" style={{ 'display': 'none' }}>&#xe60e;</em>
                            </div>

                            <a href="javascript:;" type="text" styleName={this.state.enableLogin ? 'u-submit' : 'u-submit disable'} onClick={() => { console.log('click'); this.doLogin() }}>登&nbsp;&nbsp;录</a>
                            <div style={{'float': 'right'}}><a href="#register" style={{ 'fontSize': '.28rem', 'color': '#4C8CF8', 'paddingRight': '.30rem' }}>注册领取188元红包</a></div>
                            <div style={{'float': 'left'}}><a href="getpasswd.html" style={{ 'fontSize': '.28rem', 'color': '#666', 'paddingLeft': '.30rem' }}>忘记密码？</a></div>
                        </div>
                    </div>
                </Main>
            </Page>
        )
    }
}
