import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

// 引入样式
import './index.less'

import request from 'src/lib/request'

import AppSwitch from 'src/component/app-switch'
import { Header, Main, List } from 'src/component/page'

import BidItem from 'src/component/cmn/bidItem'

import InvestDetailRouter from './detail'
import Repay from './repay'

export class Invest extends Component {
    state = {
        flowRepayingCount: '',
        flowRepayedCount: ''
    }

    componentWillUnmount() {
        this.unmount = true
    }

    load = async (page) => {
        const result = await request('invest/borrowList', { type: 'flow' })

        if (this.unmount) {
            return
        }

        if (result.code === 200) {
            this.setState({
                flowRepayingCount: result.flowRepayingCount || '',
                flowRepayedCount: result.flowRepayedCount || ''
            })
            return {
                list: result.flowSellingList,
                ended: true
            }
        } else {
            throw new Error()
        }
    }

    render() {
        const endMessage = (
            <Link styleName='more' to={`${this.props.match.url}/repaying`}>
                已售罄项目{this.state.flowRepayingCount ? this.state.flowRepayingCount : '---'}个，已还款项目{this.state.flowRepayedCount ? this.state.flowRepayedCount : '---'}个，点击查看
            </Link>
        )

        return (
            <React.Fragment>
                <Header title='投资' noBack />

                <Main noScroll>
                    <List load={this.load} footer={endMessage}>
                        {(item) => (
                            <BidItem key={item.id} {...item} className='invest' listType={1} />
                        )}
                    </List>
                </Main>
            </React.Fragment>
        )
    }
}

export function InvestRouter({ match }) {
    return (
        <AppSwitch>
            <Route path={`${match.url}/:id(\\d+)`} component={InvestDetailRouter} />
            <Route path={`${match.url}/:type(repaying|repayed)`} component={Repay} />
        </AppSwitch>
    )
}
