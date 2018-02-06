import React, { Component } from 'react'

import request from 'src/lib/request'
import { Page, Header, Main, List } from 'src/component/page'
import { Route, Link } from 'react-router-dom'
import Detail from './detail.jsx'
import './list.less'

class Index extends Component {
    state = {}

    async componentDidMount() {
        try {
            const response = await request('mine/collect/totalCollectDataService')
            this.setState({ ...response })
        } catch (err) {

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
        const result = await request('mine/collect/collectDataService', { page, rows: 10 })
        if (result.code === 0) {
            return {
                list: result.collectionlist,
                ended: result.collectionlist.length !== 10
            }
        } else {
            throw new Error()
        }
    }

    render() {
        return (
            <Page>
                <Header title="待收总额" />
                <section styleName="m-total ofh">
                    <div styleName="f-fl tc">
                        <p>{this.state.repaymentAccount}</p>
                        <span>待收本金总额(元)</span>
                    </div>
                    <div styleName="f-fr tc">
                        <p>{this.state.repaymentInterest}</p>
                        <span>待收利息总额(元)</span>
                    </div>
                </section>
                <Main styleName="m-list">
                    <List load={this.loadList}>
                        {(item, index) => (
                            <Link to={`/mine/collect/${item.borrowId}`}>
                                <div styleName="item" data-borrow-id={item.tenderId} key={index}>
                                    <div styleName="u-title ofh">
                                        <div styleName="f-fl">
                                            <p>{item.borrowName}<i>({item.orders})</i></p>
                                            <span styleName="u-time">{item.addtime}</span>
                                        </div>
                                        <p styleName="detail f-fr">详情&gt;&gt;</p>
                                    </div>
                                    <div styleName="u-detail ofh">
                                        <p styleName="f-fl">回款：<i>{item.coupon ? item.coupon : 0.00}</i>元</p>
                                        <div styleName="f-fr">
                                            <span styleName="db">{this.formatDate(item.repayTime, 'yyyy-MM-dd hh:mm:ss')}</span>
                                            <span styleName="db">剩余:<i>{item.days}</i>天</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </List>
                </Main>
            </Page>
        )
    }
}
export default function Collect({ match }) {
    return [
        <Route key="0" exact path={match.url} component={Index} />,
        <Route key="1" path={`${match.url}/:id(\\d+)`} component={Detail} />
    ]
}
