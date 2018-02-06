import { Link, Route } from 'react-router-dom'
import React, { Component } from 'react'

import AppSwitch from 'src/component/app-switch'
import { Page, Header, Main } from 'src/component/page'

import Password from './password'
import ChangePayWord from './changePayWord'
import PayWord from './payWord/payWord.jsx'

import './setting.less'

class Setting extends Component {
    render() {
        return (
            <Page>
                <Header title='设置' />

                <Main>
                    <div styleName='menu'>
                        <Link styleName='menu-item' to="/more/setting/password">
                            <p className='u-tit-install f-fl'>修改登录密码</p>
                            <i styleName='icon-1 icon-right-arrow' />
                        </Link>
                        <Link styleName='menu-item' to="/more/setting/payWord">
                            <p className='u-tit-install f-fl'>修改支付密码</p>
                            <i styleName='icon-1 icon-right-arrow' />
                        </Link>
                        <Link styleName='menu-item' className='J_pwd' to="/more/setting/changepayword">
                            <p className='u-tit-install f-fl'>找回支付密码</p>
                            <i styleName='icon-1 icon-right-arrow' />
                        </Link>
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

const setList = ({ match }) => (
    <AppSwitch>
        <Route exact path={match.url} component={Setting} />
        <Route path={`${match.url}/password`} component={Password} />
        <Route path={`${match.url}/payWord`} component={PayWord} />
        <Route path={`${match.url}/ChangePayWord`} component={ChangePayWord} />
    </AppSwitch>
)

export default setList
