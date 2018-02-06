import React, { Component } from 'react'

import { Page, Header, Main } from 'src/component/page'

import './index.less'

export default class ChangePayWord extends Component {
    render() {
        return (
            <Page>
                <Header title='找回支付密码' />
                <Main>
                    <div styleName='m-bd-change' style={{marginTop: '.2rem'}} >
                        <form id='retrievePayPasswordForm'>
                            <div styleName='m-bd-input-change'>
                                <div>
                                    <input type='password' styleName='u-bd-input-change' name='regPWD' id='regPWD' maxLength="11" value='' placeholder='请输入登录密码'
                                        style={{ borderBottom: '1px solid #dcdcdc' }} />
                                    <p styleName='tips-box' style={{ display: 'none' }}>
                                        <em><img src='https://icdn.cnaidai.com/aidai/webchat/static/img/icon-warn.png' /></em>
                                        <span />
                                    </p>
                                </div>
                            </div>
                            <div styleName='m-bd-button-change'>
                                <a href='#receive'><button type='button' styleName='u-bd-button-change' name='register' id='submit'>下一步</button></a>
                            </div>
                        </form>
                    </div>
                </Main>

            </Page >
        )
    }
}
