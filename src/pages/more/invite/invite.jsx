import React, { Component } from 'react'

import request from 'src/lib/request'

import { Page, Header, Main, List } from 'src/component/page'

import './invite.less'

export default class Invite extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inviList: [],
            page: 1,
            listEnded: false
        }
    }
    formatDate = (a, b) => {
        function format(a, d) {
            var b = {
                'M+': a.getMonth() + 1,
                'd+': a.getDate(),
                'h+': a.getHours(),
                'm+': a.getMinutes(),
                's+': a.getSeconds(),
                'q+': Math.floor((a.getMonth() + 3) / 3),
                S: a.getMilliseconds()
            };
            /(y+)/.test(d) && (d = d.replace(RegExp.$1, (a.getFullYear() + '').substr(4 - RegExp.$1.length)))
            for (var c in b) new RegExp('(' + c + ')').test(d) && (d = d.replace(RegExp.$1, RegExp.$1.length === 1 ? b[c] : ('00' + b[c]).substr(('' + b[c]).length)))
            return d
        }
        return isNaN(a) || a === '' ? '' : a < 0 || a > 99999999999 ? '' : format(new Date(1e3 * parseInt(a)), b)
    }
    loadList = async (page) => {
        const result = await request('more/inviteHtmService', { page: page + 1, rows: 12 })
        if (result.code === 0) {
            return {
                list: result.phoneList,
                ended: result.phoneList.length < 12
            }
        } else {
            throw new Error()
        }
    }
    render() {
        return (
            <Page>
                <Header title='邀请记录' />
                <div className='m-bd-nav-invite'>
                    <ul styleName='m-nav-invite ofh'>
                        <li styleName='u-li-invite u-li-invite1 f-fl'>用户名</li>
                        <li styleName='u-li-invite u-li-invite2 f-fl'>注册时间</li>
                        <li styleName='u-li-invite u-li-invite3 f-fl'>达到1000</li>
                    </ul>
                </div>
                <Main noScroll>
                    <List className='m-cardBox J_repayedList' load={this.loadList}>
                        {(item, index) => (
                            <ul styleName='m-nav-invite ofh' key={index}>
                                <li styleName='u-li-invite u-li-invite1 f-fl'>
                                    {item.phone}
                                </li>
                                <li styleName='u-li-invite u-li-invite2 f-fl'>
                                    {this.formatDate(item.addtime, 'yyyy-MM-dd')}
                                </li>
                                <li styleName='u-li-invite u-li-invite3 f-fl'>
                                    {item.tenderstatus}
                                </li>
                            </ul>
                        )}
                    </List>
                </Main>
            </Page>
        )
    }
}
