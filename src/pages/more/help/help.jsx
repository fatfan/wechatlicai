import React, { Component } from 'react'

import { Page, Header, Main } from 'src/component/page'

import './help.less'

export default class Activity extends Component {
    render() {
        return (
            <Page>
                <Header title='帮助' goback='goback' address='/more' />
                <Main>
                    <div styleName='m-bd-help'>
                        <div styleName='m-bd-con-help'>
                            <p styleName='u-nav-help'>热点问题</p>
                            <a>
                                <div styleName='m-bd-detail-help ofh'>
                                    <p styleName='u-tit-help f-fl'>1.爱贷网的账户安全吗？</p>
                                    <img src='https://icdn.cnaidai.com/aidai/webchat/static/img/xiangyou@2x.png' styleName='u-icon-arrows-help f-fr' />
                                </div>
                            </a>
                            <a>
                                <div styleName='m-bd-detail-help ofh'>
                                    <p styleName='u-tit-help f-fl'>2.为什么要实名认证？</p>
                                    <img src='https://icdn.cnaidai.com/aidai/webchat/static/img/xiangyou@2x.png' styleName='u-icon-arrows-help f-fr' />
                                </div>
                            </a>
                            <a>
                                <div styleName='m-bd-detail-help ofh' style={{ borderBottom: '1px solid #dcdcdc' }}>
                                    <p styleName='u-tit-help f-fl'>3.爱贷网都有哪些投标产品？</p>
                                    <img src='https://icdn.cnaidai.com/aidai/webchat/static/img/xiangyou@2x.png' styleName='u-icon-arrows-help f-fr' />
                                </div>
                            </a>
                        </div>
                        <div styleName='m-bd-con-help'>
                            <p styleName='u-nav-help'>常见问题</p>
                            <a>
                                <div styleName='m-bd-detail-help ofh'>
                                    <p styleName='u-tit-help f-fl'>1.如何在爱贷网注册？</p>
                                    <img src='https://icdn.cnaidai.com/aidai/webchat/static/img/xiangyou@2x.png' styleName='u-icon-arrows-help f-fr' />
                                </div>
                            </a>
                            <a>
                                <div styleName='m-bd-detail-help ofh'>
                                    <p styleName='u-tit-help f-fl'>2.如何修改登陆密码？</p>
                                    <img src='https://icdn.cnaidai.com/aidai/webchat/static/img/xiangyou@2x.png' styleName='u-icon-arrows-help f-fr' />
                                </div>
                            </a>
                            <a>
                                <div styleName='m-bd-detail-help ofh'>
                                    <p styleName='u-tit-help f-fl'>3.如果遗忘了密码，应该怎么办？</p>
                                    <img src='https://icdn.cnaidai.com/aidai/webchat/static/img/xiangyou@2x.png' styleName='u-icon-arrows-help f-fr' />
                                </div>
                            </a>
                            <a>
                                <div styleName='m-bd-detail-help ofh'>
                                    <p styleName='u-tit-help f-fl'>4.如何让我的账户密码更安全？</p>
                                    <img src='https://icdn.cnaidai.com/aidai/webchat/static/img/xiangyou@2x.png' styleName='u-icon-arrows-help f-fr' />
                                </div>
                            </a>
                            <a>
                                <div styleName='m-bd-detail-help ofh'>
                                    <p styleName='u-tit-help f-fl'>5.什么是交易密码？如何修改？</p>
                                    <img src='https://icdn.cnaidai.com/aidai/webchat/static/img/xiangyou@2x.png' styleName='u-icon-arrows-help f-fr' />
                                </div>
                            </a>
                            <a>
                                <div styleName='m-bd-detail-help ofh' style={{ borderBottom: '1px solid #dcdcdc' }}>
                                    <p styleName='u-tit-help f-fl'>6.注册后能否修改用户名？</p>
                                    <img src='https://icdn.cnaidai.com/aidai/webchat/static/img/xiangyou@2x.png' styleName='u-icon-arrows-help f-fr' />
                                </div>
                            </a>
                        </div>
                    </div>
                </Main>
            </Page>
        )
    }
}
