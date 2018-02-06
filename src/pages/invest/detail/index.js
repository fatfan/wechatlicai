import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

import request from 'src/lib/request'

import AppSwitch from 'src/component/app-switch'
import { Page, Header, Main } from 'src/component/page'
import Flex from 'src/component/flex'
import withProps from 'src/component/with-props'
import Button from 'src/component/button'
import { BidItemTitle } from 'src/component/cmn/bidItem'

import Project from 'src/pages/invest/detail/project'
import Borrow from 'src/pages/invest/detail/borrow'
import History from 'src/pages/invest/detail/history'
import Order from 'src/pages/invest/detail/order'

import './index.less'

const BUTTON_STATUS = {
    0: {
        disabled: false,
        children: '立即投资'
    },
    1: {
        disabled: true,
        children: '已售罄'
    },
    2: {
        disabled: true,
        children: '已还款'
    },
    undefined: {
        disabled: true,
        children: '立即投资'
    }
}

class InvestDetail extends Component {
    render() {
        const content = this.props.detail && this.props.detail.getContent
        const status = content && content.bStatus

        return (
            <Page>
                <Header title={content && content.title} />

                <Main>
                    <div styleName="main">
                        {content && <BidItemTitle styleName="title-container" inlineAward {...content} title="" />}
                        <div styleName="interest">
                            <div>预期年化</div>
                            <div styleName="value-container">
                                <span styleName="value">{content && parseFloat(content.apr).toFixed(1)}</span>
                                <span styleName="unit">%</span>
                            </div>
                        </div>

                        <div styleName="properties">
                            <div styleName="property">
                                {content && parseFloat(content.lowestAccount).toLocaleString()}元起投
                            </div>

                            <div styleName="property">
                                期限{content && content.timeLimit}个月
                            </div>

                            <div styleName="property">
                                {content && content.investType}
                            </div>
                        </div>

                        <div styleName="advantage" />
                    </div>

                    <div styleName="section">
                        <div styleName="progress">
                            <div styleName="value" style={{ marginLeft: content ? content.scale + '%' : 0 }}>{content && Math.floor(content.scale) + '%'}</div>
                            <div styleName="progress-track">
                                <div styleName="progress-bar" style={{ width: content ? content.scale + '%' : 0 }} />
                            </div>
                        </div>
                        <Flex>
                            <Link styleName="invest-times" to={`${this.props.match.url}/history`}>
                                已投人数{content && content.tenderTimes}&gt;&gt;
                            </Link>
                            <Flex grow />
                            <div styleName="left-amount">
                                剩余可投：{content && parseFloat(content.other).toLocaleString()}元
                            </div>
                        </Flex>
                    </div>
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

                <Button height={92} to={`${this.props.match.url}/order`} {...BUTTON_STATUS[status]} />
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

        return (
            <AppSwitch>
                <Route exact path={match.url} render={withProps(InvestDetail, this.state)} />
                <Route path={`${match.url}/project`} render={withProps(Project, this.state)} />
                <Route path={`${match.url}/order`} render={withProps(Order, this.state)} />
                <Route path={`${match.url}/borrow`} render={withProps(Borrow, { id: match.params.id })} />
                <Route path={`${match.url}/history`} render={withProps(History, { id: match.params.id })} />
            </AppSwitch>
        )
    }
}
