import React, { Component } from 'react'

import { Page, Header, Main } from 'src/component/page'

import './safety.less'

export default class Safety extends Component {
    render() {
        return (
            <Page>
                <Header title='安全保障' />
                <Main>
                    <div styleName="m-bd-safe" />
                </Main>
            </Page>
        )
    }
}
