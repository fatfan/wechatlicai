import React, { Component } from 'react'
import { Page, Header, Main, List } from 'src/component/page'
import request from 'src/lib/request'
// 引入样式
import './detail.less'
function EndMessage() {
    return (
        <p>没有更多了</p>
    )
}
export default class Detail extends Component {
    state = {}

    async componentDidMount() {
        var id = this.props.match.params.id
        try {
            const response = await request('mine/collect/bidDetailDataService.cgi', { id })
            this.setState({ ...response })
        } catch (err) {

        }
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

    render() {
        return (
            <Page>
                <Header title={this.state.borrowName} />
                <Main>
                    <section styleName="m-menu ofh">
                        <div styleName="f-fl">
                            <p>年化收益率：{this.state.apr}</p>
                            <p>投资金额：<i>{this.state.investmentMoney}</i>元</p>
                            <p>实付金额：<i>{this.state.payInvestmentMoney}</i>元</p>
                            <p>购买日期：{this.state.addtime}</p>
                        </div>
                        <div styleName="f-fr">
                            <p>项目期限：{this.state.timeLimit}</p>
                            <p>还款方式：{this.state.investType}</p>
                            <p>总收益：<i>{this.state.totalEarnings}</i>元</p>
                        </div>
                    </section>
                    <section styleName="m-list">
                        <h4>详情</h4>
                        <table styleName="u-tb">
                            <tbody>
                                <tr>
                                    <td>收款时间</td>
                                    <td>期数/总期数</td>
                                    <td>金额(元)</td>
                                    <td>状态</td>
                                </tr>
                                {this.state.collectionlist && this.state.collectionlist.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{this.dateFormat(item.repayTime, 'yyyy/MM/dd')}</td>
                                            <td>{item.orderApp}</td>
                                            <td>{item.repayAccount}</td>
                                            <td> {item.status && item.status === 0 ? '待收' : '已收款'}</td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </table>
                    </section>
                    <List endMessage={<EndMessage />} loadMore={this.loadList} render={(item, index) => (
                        <div styleName="item" data-borrow-id={item.tenderId} key={index}>
                            <div styleName="u-title ofh">
                                <div styleName="f-fl">
                                    <p>{item.borrowName}<i>({item.orders})</i></p>
                                    <span styleName="u-time">{item.addtime}</span>
                                </div>
                                <a href="javascript:;" styleName="f-fr">详情&gt;&gt;</a>
                            </div>
                            <div styleName="u-detail ofh">
                                <p styleName="f-fl">回款：<i>{item.coupon ? item.coupon : 0.00}</i>元</p>
                                <div styleName="f-fr">
                                    <span styleName="db">{this.formatDate(item.repayTime, 'yyyy-MM-dd hh:mm:ss')}</span>
                                    <span styleName="db">剩余:<i>{item.days}</i>天</span>
                                </div>
                            </div>
                        </div>
                    )} />
                </Main>
            </Page>
        )
    }
}
