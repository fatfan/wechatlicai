import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

import { Page, Header, Main } from 'src/component/page'

import './activity.less'

export default class Activity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList: []
        }
    }

    componentDidMount() {
        var that = this
        fetch('/wechatlicai/src/datapi/more/activityHtmlService.cgi', {
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
                if (rslt.code === 0 && rslt.dataList) {
                    that.setState({
                        dataList: rslt.dataList
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
                <Header title='活动专区' />
                <Main style={{ marginTop: '0.25rem' }}>
                    {this.state.dataList && this.state.dataList.map((item, i) => {
                        return (
                            <a href={item.url} key={i}>
                                <div styleName='morc-act-ban'>
                                    <p styleName='u-tit-ac'>{item.desc}</p>
                                    <p styleName='u-time-ac'>活动时间:{this.formatDate(item.starttime, 'yyyy-MM-dd')}{item.endtime ? '至' + this.formatDate(item.endtime, 'yyyy-MM-dd') : '起'}</p>
                                    <img src={item.imgUrl} styleName='u-img-act' />
                                </div>
                            </a>
                        )
                    })}
                </Main>
            </Page>
        )
    }
}
