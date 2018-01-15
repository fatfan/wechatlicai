import React, { Component } from 'react'
import request from 'src/lib/request'
import { Page, Header, Main, List } from 'src/component/page'
// 引入样式
import './detail.less'

export default class Balance extends Component {
    state = {
        index: 0
    }
    async componentDidMount() {
    }
    load = async (type, page) => {
        const result = await request(`mine/balance/balance${type}DataService`, { page, rows: 10 })
        if (result.code === 0) {
            return {
                list: result.log,
                ended: result.log.length !== 10
            }
        } else {
            throw new Error()
        }
    }
    handleBulletClick = (i, e) => {
        this.setState({
            index: i
        })
        console.log(i)
    }
    dateFormat = (a, b) => {
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
    numFormat = (num, precision) => {
        precision = precision || 2
        var tmp = num.toString()
        var len = tmp.length
        var dot = tmp.indexOf('.')
        if (!num && num !== 0) {
            return ''
        }
        if (dot < 0) {
            tmp = tmp + '.'
            for (var i = 0; i < precision; i++) {
                tmp += '0'
            }
            return tmp
        }
        if (len <= dot + precision) {
            for (; len <= dot + precision; len++) {
                tmp += '0'
            }
            return tmp
        }
        return tmp.substr(0, dot + precision + 1)
    }
    render() {
        return (
            <Page>
                <Header title="账户余额明细" />
                <nav styleName="u-tab">
                    <span styleName={this.state.index === 0 ? 'u-current' : ''} onClick={this.handleBulletClick.bind(this, 0)}>全部</span>
                    <span styleName={this.state.index === 1 ? 'u-current' : ''} onClick={this.handleBulletClick.bind(this, 1)}>收入</span>
                    <span styleName={this.state.index === 2 ? 'u-current' : ''} onClick={this.handleBulletClick.bind(this, 2)}>支出</span>
                </nav>
                <Main styleName="m-detail">
                    <div styleName="m-itemSwiper" style={{ left: -this.state.index * 7.5 + 'rem' }}>
                        <div styleName="m-itemBox">
                            <List load={this.load.bind(this, 'All')}>
                                {(item, index) => (
                                    <div styleName="u-item-box ofh" key={index}>
                                        <div styleName="f-fl">
                                            <p styleName="u-class">{item.type}</p>
                                            <span>{this.dateFormat(item.addtime, 'yyyy-MM-dd hh:mm:ss')}</span>
                                        </div>
                                        <div styleName="f-fr">
                                            {item.accountType === 1 ? <p styleName="u-sum c-red">+{item.money ? this.numFormat(item.money, 2) : 0.00}</p> : <p styleName="u-sum c-blue">-{item.money ? this.numFormat(item.money, 2) : 0.00}</p>}
                                            <span>余额：{item.useMoney ? this.numFormat(item.useMoney, 2) : 0.00}</span>
                                        </div>
                                    </div>
                                )}
                            </List>
                        </div>
                        <div styleName="m-itemBox">
                            <List load={this.load.bind(this, 'Income')}>
                                {(item, index) => (
                                    <div styleName="u-item-box ofh" key={index}>
                                        <div styleName="f-fl">
                                            <p styleName="u-class">{item.type}</p>
                                            <span>{this.dateFormat(item.addtime, 'yyyy-MM-dd hh:mm:ss')}</span>
                                        </div>
                                        <div styleName="f-fr">
                                            {item.accountType === 1 ? <p styleName="u-sum c-red">+{item.money ? this.numFormat(item.money, 2) : 0.00}</p> : <p styleName="u-sum c-blue">-{item.money ? this.numFormat(item.money, 2) : 0.00}</p>}
                                            <span>余额：{item.useMoney ? this.numFormat(item.useMoney, 2) : 0.00}</span>
                                        </div>
                                    </div>
                                )}
                            </List>
                        </div>
                        <div styleName="m-itemBox">
                            <List load={this.load.bind(this, 'Pay')}>
                                {(item, index) => (
                                    <div styleName="u-item-box ofh" key={index}>
                                        <div styleName="f-fl">
                                            <p styleName="u-class">{item.type}</p>
                                            <span>{this.dateFormat(item.addtime, 'yyyy-MM-dd hh:mm:ss')}</span>
                                        </div>
                                        <div styleName="f-fr">
                                            {item.accountType === 1 ? <p styleName="u-sum c-red">+{item.money ? this.numFormat(item.money, 2) : 0.00}</p> : <p styleName="u-sum c-blue">-{item.money ? this.numFormat(item.money, 2) : 0.00}</p>}
                                            <span>余额：{item.useMoney ? this.numFormat(item.useMoney, 2) : 0.00}</span>
                                        </div>
                                    </div>
                                )}
                            </List>
                        </div>
                    </div>
                </Main>
            </Page>
        )
    }
}
