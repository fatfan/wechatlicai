import React from 'react'

import { Page, Header, Main } from 'src/component/page'

import './index.less'

function Item({ name, value }) {
    return (
        <div styleName="item">
            <span styleName="name">{name}</span>
            <span>{value}</span>
        </div>
    )
}

export default function Project({ detail: { getContent: content } = {} }) {
    return (
        <Page>
            <Header title="项目简介" />

            <Main>
                <Item name="项目名称:" value={content && content.title} />
                <Item name="年化收益:" value={content && content.apr} />
                <Item name="理财期限:" value={content && content.timeLimit + '个月'} />
                <Item name="还款方式:" value={content && content.investType} />
                <Item name="项目债权金额:" value={content && content.account} />
                <Item name="发标日期:" value={content && content.verifyTime} />
            </Main>
        </Page>
    )
}
