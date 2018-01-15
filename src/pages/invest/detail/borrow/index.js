import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import request from 'src/lib/request'

import { Page, Header, Main } from 'src/component/page'

import './index.less'

function Item({ name, value }) {
    return (
        <div styleName="row">
            <div styleName="label">{name}</div>
            <div styleName="info">{value}</div>
        </div>
    )
}

function Card({ className, title, children }) {
    return (
        <div styleName="card">
            <div styleName="title">
                <i className={className} styleName="icon" />
                {title}
            </div>
            <div>
                {children}
            </div>
            <div styleName="stamp" />
        </div>
    )
}

export default class Borrow extends PureComponent {
    state = {}

    async componentDidMount() {
        const result = await request('invest/loanDetail', { id: this.props.id })
        if (result.code === 200) {
            this.setState({
                detail: result.data
            })
        }
    }

    render() {
        const { detail } = this.state

        let content
        if (!detail) {
            content = <Main />
        } else if (detail.contect) {
            content = (
                <Main styleName="main">
                    <div dangerouslySetInnerHTML={{ __html: detail.contect }} />
                </Main>
            )
        } else {
            const { selfInfo, company, borrow, verifyInfo } = detail

            content = (
                <Main>
                    <Card styleName="self" title="个人信息">
                        <Item name="用户名" value={selfInfo.userName} />
                        <Item name="性别" value={selfInfo.sex} />
                        <Item name="手机号码" value={selfInfo.userPhone} />
                        <Item name="婚姻状况" value={selfInfo.marryStatus} />
                        <Item name="所在城市" value={selfInfo.city} />
                    </Card>

                    <Card styleName="company" title="企业信息">
                        <Item name="企业名称" value={company.companyName} />
                        <Item name="企业经营地址" value={company.companyAddress} />
                        <Item name="经营年限" value={company.companyLength} />
                        <Item name="员工数量" value={company.companyMember} />
                    </Card>

                    <Card styleName="borrow" title="借款标信息">
                        <Item name="借款金额" value={borrow.account} />
                        <Item name="借款期限" value={borrow.expire} />
                        <Item name="年化利率" value={borrow.apr} />
                        <Item name="借款用途" value={borrow.purpose} />
                        <Item name="借款服务协议" value={<Link to="protocol">借款服务协议</Link>} />
                    </Card>

                    <Card styleName="verify" title="审核资料">
                        {verifyInfo.map((item) => (
                            <Item key={item.name} name={item.name} value={item.value} />
                        ))}
                    </Card>
                </Main>
            )
        }

        return (
            <Page>
                <Header title="借款详情" />

                {content}
            </Page>
        )
    }
}
