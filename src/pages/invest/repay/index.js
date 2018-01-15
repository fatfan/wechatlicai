import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

import request from 'src/lib/request'

import AppTabBar from 'src/component/app-tab-bar'
import { Page, Header, Main, List } from 'src/component/page'
import { TabBar, Tab } from 'src/component/tab-bar'
import BidItem from 'src/component/cmn/bidItem'

import './index.less'

export default class Repay extends Component {
    load = async (page) => {
        const type = this.props.match.params.type
        const result = await request(`invest/${type === 'repaying' ? 'moreFlowRepayingList' : 'moreFlowRepayedList'}`, { pageIndex: page + 1 })

        if (result.code === 200) {
            return {
                list: result.borrowDTO,
                ended: result.borrowDTO.length !== 10
            }
        } else {
            throw new Error()
        }
    }

    render() {
        return (
            <Page styleName='page'>
                <Header title='满额项目' />

                <TabBar height={88} indicator>
                    <Tab to="/invest/repaying" header="已售罄" />
                    <Tab to="/invest/repayed" header="已还款" />
                </TabBar>

                <Main noScroll>
                    <List id={this.props.match.url} styleName='swiper-slide' load={this.load}>
                        {(item) => (
                            <BidItem key={item.id} {...item} className='repay' listType={1} />
                        )}
                    </List>
                </Main>

                <AppTabBar />
            </Page >
        )
    }
}
