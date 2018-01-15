import React, { Component } from 'react'

import { Page, Header, Main } from 'src/component/page'
import Input from 'src/component/input'

export default class Order extends Component {
    render() {
        return (
            <Page>
                <Header title="投资确认" />
                <Main>
                    <h2>投资金额</h2>

                    <Input type="number" placeholder="100的整数倍" />
                </Main>
            </Page>
        )
    }
}
