import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

import request from 'src/lib/request'

import AppSwitch from 'src/component/app-switch'
import { Page, Header, Main } from 'src/component/page'
import { BidItemTitle } from 'src/component/cmn/bidItem'

import Project from 'src/pages/invest/detail/project'
import Borrow from 'src/pages/invest/detail/borrow'
import History from 'src/pages/invest/detail/history'
import Order from 'src/pages/invest/detail/order'

import './index.less'

function InvestButton({ content, match }) {
    if (content === undefined) {
        return <div styleName="bottom-button" disabled>立即投资</div>
    } else {
        switch (content.bStatus) {
            case 1:
                return <div styleName="bottom-button" disabled>已售罄</div>
            case 2:
                return <div styleName="bottom-button" disabled>已还款</div>
            default:
                return <Link styleName="bottom-button" to={`${match.url}/order`}>立即投资</Link>
        }
    }
}

class InvestDetail extends Component {
    render() {
        const content = this.props.detail && this.props.detail.getContent

        return (
            <Page styleName="page">
                <Header title={content && content.title} />

                <Main>
                    <div styleName="main">
                        {content && <BidItemTitle styleName="title-container" {...content} title="" award="" />}
                        <div styleName="interest">
                            <div>预期年化</div>
                            <div styleName="value-container">
                                <span styleName="value">{content && parseFloat(content.apr).toFixed(1)}</span>
                                <span styleName="unit">%</span>
                            </div>
                        </div>

                        <div styleName="properties">
                            <div styleName="property">
                                <span styleName="value">{content && parseFloat(content.lowestAccount).toLocaleString()}</span>
                                <span>元起投</span>
                            </div>

                            <div styleName="property">
                                <span>期限</span>
                                <span styleName="value">{content && content.timeLimit}</span>
                                <span>个月</span>
                            </div>

                            <div styleName="property">
                                <span styleName="value">{content && content.investType}</span>
                            </div>
                        </div>

                        <div styleName="advantage" />
                    </div>

                    <section>
                        <div styleName="progress">
                            <div styleName="value" style={{ marginLeft: content ? content.scale + '%' : 0 }}>{content && Math.floor(content.scale) + '%'}</div>
                            <div styleName="progress-track">
                                <div styleName="progress-bar" style={{ width: content ? content.scale + '%' : 0 }} />
                            </div>
                        </div>
                        <div>
                            <Link styleName="invest-times" to={`${this.props.match.url}/history`}>
                                <span>已投人数</span>
                                <span styleName="value">{content && content.tenderTimes}</span>
                                <span>&gt;&gt;</span>
                            </Link>
                            <a styleName="left-amount">
                                <span>剩余可投：</span>
                                <span styleName="value">{content && parseFloat(content.other).toLocaleString()}</span>
                                <span>元</span>
                            </a>
                        </div>
                    </section>
                    <div className="menu">
                        <Link className="menu-item" to={`${this.props.match.url}/project`}>
                            <span>项目介绍</span>
                            <i className="icon-1 icon-right-arrow" />
                        </Link>
                        <Link className="menu-item" to={`${this.props.match.url}/borrow`}>
                            <span>借款详情</span>
                            <i className="icon-1 icon-right-arrow" />
                        </Link>
                    </div>
                    {content && content.isNovice && <div styleName="novice-tip">{content.noviceDesc}</div>}
                </Main>

                <InvestButton content={content} match={this.props.match} />
            </Page>
        )
    }
}

export default class InvestDetailRouter extends Component {
    state = {}

    async componentDidMount() {
        this.load(this.props.match.params.id)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id === this.props.match.params.id) {
            return false
        }

        this.setState({})
        this.load(nextProps.match.params.id)
    }

    async load(id) {
        try {
            const result = await request('invest/detail', { id })
            this.setState({ ...result })
        } catch (err) {

        }
    }

    render() {
        const { match } = this.props

        function withProps(Component, props) {
            function Wrapper(extra) {
                return (<Component {...props} {...extra} />)
            }
            Wrapper.displayName = `withProps(${Component.name})`
            return Wrapper
        }

        return (
            <AppSwitch>
                <Route exact path={match.url} component={withProps(InvestDetail, this.state)} />
                <Route path={`${match.url}/project`} component={withProps(Project, this.state)} />
                <Route path={`${match.url}/order`} component={withProps(Order, this.state)} />
                <Route path={`${match.url}/borrow`} component={withProps(Borrow, { id: match.params.id })} />
                <Route path={`${match.url}/history`} component={withProps(History, { id: match.params.id })} />
            </AppSwitch>
        )
    }
}
