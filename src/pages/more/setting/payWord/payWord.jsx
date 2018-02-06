import React, { Component } from 'react'

import { Page, Header, Main } from 'src/component/page'

import './payWord.less'

export default class PayWord extends Component {
    constructor(props) {
        super(props)
        this.state = {
            btnstate: true
        }
    }
    onclick = () => {
        if (this.state.btnstate) {
            this.setState({
                btnstate: false
            })
        } else {
            this.setState({
                btnstate: true
            })
        }
    }
    render() {
        return (
            <Page>
                <Header title='找回支付密码' />
                <Main>
                    <div styleName='m-bd-change' style={{marginTop: '.2rem'}} >
                        <form id='changePayPasswordForm'>
                            <div className='m-bd-con-change'>
                                <div styleName='m-bd-input-change'>
                                    <input type='password' styleName='u-bd-input-change' name='oldPassword' id='oldPassword' placeholder='原支付密码' />
                                    <p styleName='tips-box' style={{ display: 'none' }}>
                                        <em><img src='https://icdn.cnaidai.com/aidai/webchat/static/img/icon-warn.png' /></em>
                                        <span />
                                    </p>
                                </div>
                                <div styleName='m-bd-input-change'>
                                    <input type='password' styleName='u-bd-input-change' name='newPassword' id='newPassword' placeholder='新支付密码（6位数字）' />
                                    <p styleName='tips-box' style={{ display: 'none' }}>
                                        <em><img src='https://icdn.cnaidai.com/aidai/webchat/static/img/icon-warn.png' /></em>
                                        <span />
                                    </p>
                                </div>
                                <div styleName='m-bd-input-change'>
                                    <input type='password' styleName='u-bd-input-change' name='newPassword1' id='newPassword1' placeholder='确认新支付密码' />
                                    <p styleName='tips-box' style={{ display: 'none' }}>
                                        <em><img src='https://icdn.cnaidai.com/aidai/webchat/static/img/icon-warn.png' /></em>
                                        <span />
                                    </p>
                                </div>
                            </div>
                            <div styleName='m-bd-button-change'>
                                <button type='button' styleName='u-bd-button-change' name='register' id='submit' >提交</button>
                            </div>
                            <div id='msg' style={{ display: 'none' }} />
                        </form>
                    </div>
                </Main>

            </Page >
        )
    }
}
