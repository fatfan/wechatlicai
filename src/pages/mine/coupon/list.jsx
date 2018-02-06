import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

import { Page, Header, Main } from 'src/component/page'
import { Link } from 'react-router-dom'
import './list.less'

export default class Coupon extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
        }
    }
    async componentDidMount() {
        var that = this
        fetch('/wechatlicai/src/datapi/mine/coupon/couponListService.cgi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include',
            body: ''
        })
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error('Bad response from server')
                }
                return response.json()
            })
            .then(function(rslt) {
                if (rslt) {
                    that.setState({
                        itemList: rslt.itemList
                    })
                }
            })
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
    render() {
        return (
            <Page>
                <Header title="我的券" />
                <Main id="couponList" styleName='m-mine'>
                    {this.state.itemList && this.state.itemList.map((item, i) => {
                        return (
                            <div styleName='u-coupon' data-coupon-id={item.id} data-coupon-type={item.type} data-coupon-use="1" key={i}>
                                <div styleName="ofh">
                                    <div styleName="m-prize-coupon f-fl">
                                        {item.type === 4 ? <p>+{item.money}<span>%</span></p> : <p><span>￥</span>{item.money}</p>}
                                        <p styleName="u-region">{item.regionName}</p>
                                    </div>
                                    <div styleName="m-name-coupon f-fl">
                                        <p styleName={item.type !== 3 && item.type !== 4 && item.type !== 8 ? 'u-cash-coupon u-name-coupon' : 'u-name-coupon'}>{item.typeName}</p>
                                        {(item.type === 4 || item.type === 3 || item.type === 8) && item.investLimit ? <p styleName="u-rule-coupon">满{item.investLimit}元可用</p> : <p styleName="u-rule-coupon">任意金额可用</p>}
                                        {item.type === 4 ? <p styleName="u-rule-coupon">带“息”字官标可用</p> : (item.type === 3 ? <p styleName="u-rule-coupon">带“抵”字官标可用</p> : (item.type === 8 ? <p styleName="u-rule-coupon">除新手标以外官标可用</p> : ''))}
                                        <p styleName="u-time-coupon">有效期至：{this.formatDate(item.endtime, 'yyyy-MM-dd hh:mm:ss')}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div styleName="more">
                        <span>没有更多的券了</span>
                        <a href="used.html" styleName="link-used">查看失效券</a>
                    </div>
                    <Link to={`/invest`}>
                        <div styleName="button-container">
                            <div styleName="button">去投资</div>
                        </div>
                    </Link>
                </Main>
            </Page>
        )
    }
}
