/* global ud */

import { Link, Route } from 'react-router-dom'
import React, { Component } from 'react'

import AppSwitch from 'src/component/app-switch'
import { Header, Main } from 'src/component/page'

import Activity from './activity/activity.jsx'
import Help from './help/help.jsx'
import Notice from './notice/notice.jsx'
import Safety from './safety/safety.jsx'
import Setting from './setting/setting.jsx'
import Invite from './invite/invite.jsx'
import Intro from './intro/intro.jsx'

import './index.less'

export class More extends Component {
    componentDidMount() {
        if (typeof ud === 'undefined') {
            More.serviceButton = document.createElement('div')
            More.serviceButton.id = 'service'
            document.body.appendChild(More.serviceButton);

            (function(a, h, c, b, f, g) {
                a['UdeskApiObject'] = f
                a[f] = a[f] || function() {
                    (a[f].d = a[f].d || []).push(arguments)
                }
                g = h.createElement(c)
                g.async = 1
                g.charset = 'utf-8'
                g.src = b
                c = h.getElementsByTagName(c)[0]
                c.parentNode.insertBefore(g, c)
            })(window, document, 'script', '//assets-cli.udesk.cn/im_client/js/udeskApi.js', 'ud')
            ud({
                'code': '1hd4kdhf',
                'link': '//cnaidai.udesk.cn/im_client?web_plugin_id=24489',
                'targetSelector': '#service'
            })
        }
    }

    componentWillUnmount() {
        if (typeof ud !== 'undefined' &&
            typeof ud.hidePanel === 'function') {
            ud.hidePanel()
        }
    }

    onServiceClick = () => {
        More.serviceButton.click()
    }

    render() {
        return (
            <React.Fragment>
                <Header title="更多" noBack />

                <Main>
                    <div>
                        <div styleName='menu'>
                            <Link styleName='menu-item' to="/more/activity">
                                <i styleName='icon icon-activity' />
                                <span>活动专区</span>
                                <i styleName='icon-1 icon-right-arrow' />
                            </Link>
                            <Link styleName='menu-item' to="/more/notice">
                                <i styleName='icon icon-notice' />
                                <span>公告消息</span>
                                <i styleName='icon-1 icon-right-arrow' />
                            </Link>
                        </div>
                        <div styleName='menu'>
                            <Link styleName='menu-item' to="/more/safety">
                                <i styleName='icon icon-safe' />
                                <span>安全保障</span>
                                <i styleName='icon-1 icon-right-arrow' />

                            </Link>
                            <Link styleName='menu-item' to="/more/invite">
                                <i styleName='icon icon-invite' />
                                <span>邀请好友</span>
                                <i styleName='icon-1 icon-right-arrow' />
                            </Link>
                        </div>
                        <div styleName='menu'>
                            <Link styleName='menu-item' to="/more/help">
                                <i styleName='icon icon-help' />
                                <span>帮助</span>
                                <i styleName='icon-1 icon-right-arrow' />
                            </Link>
                            <Link styleName='menu-item' to="/more/setting">
                                <i styleName='icon icon-settings' />
                                <span>设置</span>
                                <i styleName='icon-1 icon-right-arrow' />
                            </Link>
                        </div>
                        <div styleName='menu'>
                            <Link styleName='menu-item' to="/more/intro">
                                <i styleName='icon icon-intro' />
                                <span>爱贷介绍</span>
                                <i styleName='icon-1 icon-right-arrow' />
                            </Link>
                            <div styleName='menu-item'>
                                <i styleName='icon icon-telephone' />
                                <span>客服电话</span>
                                <a styleName='menu-right' href="tel:4008886365">400-888-6365</a>
                            </div>
                            <div styleName='menu-item' className=' link-service' onClick={this.onServiceClick}>
                                <i styleName='icon icon-qq' />
                                <span>在线客服</span>
                                <span styleName='menu-right'>09:00-21:00</span>
                            </div>
                        </div>
                    </div>
                </Main>
            </React.Fragment>
        )
    }
}

export function MoreRouter({ match }) {
    return (
        <AppSwitch>
            <Route path={`${match.url}/activity`} component={Activity} />
            <Route path={`${match.url}/notice`} component={Notice} />
            <Route path={`${match.url}/safety`} component={Safety} />
            <Route path={`${match.url}/setting`} component={Setting} />
            <Route path={`${match.url}/help`} component={Help} />
            <Route path={`${match.url}/invite`} component={Invite} />
            <Route path={`${match.url}/intro`} component={Intro} />
        </AppSwitch>
    )
}
