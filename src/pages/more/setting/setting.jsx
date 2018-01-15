import React, { Component } from 'react'

import { Page, Header, Main } from 'src/component/page'

import './setting.less'

export default class Setting extends Component {
    render() {
        return (
            <Page>
                <Header title='设置' />

                <Main>
                    <div styleName='menu'>
                        <a styleName='menu-item' href='changeRegisterPassword.html'>
                            <p className='u-tit-install f-fl'>修改登录密码</p>
                            <i styleName='icon-1 icon-right-arrow' />
                        </a>
                        <a styleName='menu-item' href='changePayPassword.html'>
                            <p className='u-tit-install f-fl'>修改支付密码</p>
                            <i styleName='icon-1 icon-right-arrow' />
                        </a>
                        <a styleName='menu-item' className='J_pwd' href='javascript:;'>
                            <p className='u-tit-install f-fl'>找回支付密码</p>
                            <i styleName='icon-1 icon-right-arrow' />
                        </a>
                    </div>
                    <div styleName='menu'>
                        <a styleName='menu-item' href='contact.html'>
                            <p className='u-tit-install f-fl'>联系我们</p>
                            <i styleName='icon-1 icon-right-arrow' />
                        </a>
                    </div>
                    <div styleName='menu'>
                        <a styleName='menu-item' style={{ paddingLeft: '0rem' }}>
                            <p styleName='u-button-install'>退出</p>
                        </a>
                    </div>
                </Main>

            </Page >
        )
    }
}
