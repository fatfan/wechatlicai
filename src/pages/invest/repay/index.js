import React, { Component } from 'react'

import request from 'src/lib/request'

import { Page, Header, List } from 'src/component/page'
import { Tabs, Tab } from 'src/component/tabs'
import BidItem from 'src/component/cmn/bidItem'

import './index.less'

export default class Repay extends Component {
    load = async (page, param) => {
        const result = await request(`invest/${param === 'repaying' ? 'moreFlowRepayingList' : 'moreFlowRepayedList'}`, { pageIndex: page + 1 })

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
            <Page>
                <Header title='满额项目' />

                <Tabs height={88} indicator>
                    <Tab to="/invest/repaying" title="已售罄" >
                        <List load={this.load} param="repaying">
                            {(item) => (
                                <BidItem key={item.id} {...item} className='repay' listType={1} />
                            )}
                        </List>
                    </Tab>
                    <Tab to="/invest/repayed" title="已还款">
                        <List load={this.load} param="repayed">
                            {(item) => (
                                <BidItem key={item.id} {...item} className='repay' listType={1} />
                            )}
                        </List>
                    </Tab>
                </Tabs>
            </Page >
        )
    }
}
