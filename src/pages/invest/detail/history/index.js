import React, { PureComponent } from 'react'

import { Page, Header, Main, List } from 'src/component/page'

import request from 'src/lib/request'

import './index.less'

const TYPES = {
    1: '自动投标',
    2: 'APP投标',
    3: 'PC投标',
    4: 'WAP投标'
}

function Item({ username, isAutoTender: type, money, addtime: time }) {
    return (
        <div styleName="item">
            <div styleName="line">
                {username}
                <span styleName="type">
                    ({TYPES[type]})
                </span>
                <span styleName="right red">
                    {money.toFixed(2)}
                </span>
            </div>
            {time}
            <span styleName="right">
                投资奖励: 0
            </span>
        </div>
    )
}

export default class History extends PureComponent {
    load = async () => {
        const result = await request('invest/tenderList', { id: this.props.id })

        if (result.code !== 0) {
            throw new Error()
        }

        return {
            list: result.borrowTenderDTO,
            ended: true
        }
    }

    render() {
        return (
            <Page>
                <Header title="投标记录" />

                <Main>
                    <List load={this.load}>
                        {(item) => (<Item key={item.id} {...item} />)}
                    </List>
                </Main>
            </Page>
        )
    }
}
