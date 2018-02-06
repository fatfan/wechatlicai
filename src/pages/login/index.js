import React, { Component } from 'react'
import { withRouter } from 'react-router'

import { Page, Header, Main } from 'src/component/page'
import Flex from 'src/component/flex'
import Input from 'src/component/input'
import Toast from 'src/component/toast'
import Button from 'src/component/button'

import request from 'src/lib/request'

import './index.less'

class Login extends Component {
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

    doLogin = async () => {
        console.log(
            'dologin called...'
        )

        const result = await request('login', this.state)
        if (result.code !== 0) {
            console.log('用户名或密码错误')
            Toast.show(result.message || '用户名或密码错误')
        } else {
            console.log('登录成功')
            console.log(this.props.match.url)
            this.props.history.goBack()
        }
    }

    handleChangeUsername = (value) => {
        this.setState({
            username: value,
            // enableLogin: !!this.refs["username"].value && !!this.refs["password"].value,
            enableLogin: !!value && !!this.state.password
        })
        // console.log(this.refs["username"].value + " " + this.refs["password"].value)
    }
    handleChangePassword = (value) => {
        this.setState({
            password: value,
            enableLogin: !!this.state.username && !!value
        })
        // console.log(this.refs["username"].value + " " + this.refs["password"].value)
    }
    moveTest = (e) => {

    }
    render() {
        return (
            <Page styleName="page">
                <Header title="登录" backUrl="/" />
                <Main>
                    <div styleName="g-cnt">
                        <div styleName="icon-logo">&#xe610;</div>
                        <p styleName="m-message">aaa</p>
                        <div styleName="m-login">
                            <Input styleName="input" placeholder="请输入用户名/手机号" value={this.state.username} onChange={this.handleChangeUsername}>
                                <span styleName="label">用户名</span>
                            </Input>
                            <Flex styleName="input">
                                <Input type="password" placeholder="密码" value={this.state.password} onChange={this.handleChangePassword}>
                                    <span styleName="label">登录密码</span>
                                </Input>
                                <em styleName="icon-eye">&#xe60d;</em>
                                <em styleName="icon-eye" style={{ 'display': 'none' }}>&#xe60e;</em>
                            </Flex>

                            <Button width={680} styleName="u-submit" round disabled={!this.state.enableLogin} onClick={this.doLogin}>登&nbsp;&nbsp;录</Button>
                            <div style={{ 'float': 'right' }}><a href="#register" style={{ 'fontSize': '.28rem', 'color': '#4C8CF8', 'paddingRight': '.30rem' }}>注册领取188元红包</a></div>
                            <div style={{ 'float': 'left' }}><a href="getpasswd.html" style={{ 'fontSize': '.28rem', 'color': '#666', 'paddingLeft': '.30rem' }}>忘记密码？</a></div>
                        </div>
                    </div>
                </Main>
            </Page>
        )
    }
}

export default withRouter(Login)
