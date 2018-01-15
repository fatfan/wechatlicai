import React, { Component } from 'react'

import request from 'src/lib/request'

import { Page, Header, Main, List } from 'src/component/page'

import './notice.less'

export default class Notice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0
        }
    }
    handleBulletClick = (i, e) => {
        this.setState({
            index: i
        })
    }

    loadList = async (type, page) => {
        const result = await request(`more/${type === 0 ? 'noticeHtmService' : 'personInfoHtmService'}`, { page: page + 1, rows: 15 })
        if (result.code === 0) {
            return {
                list: result.noticeList,
                ended: result.noticeList.length !== 10
            }
        } else {
            throw new Error()
        }
    }

    render() {
        return (
            <Page>
                <Header title='消息中心' />
                <div styleName='pagination-container'>
                    <div styleName='noticeTab'>
                        <div styleName={this.state.index === 0 ? 'tabbtn active' : 'tabbtn'} onClick={this.handleBulletClick.bind(this, 0)}>公告</div>
                        <div styleName={this.state.index === 1 ? 'tabbtn active' : 'tabbtn'} onClick={this.handleBulletClick.bind(this, 1)}>个人消息</div>
                    </div>
                    <div styleName='indicator-wrapper'>
                        <div styleName='indicator' style={{ marginLeft: this.state.index * 3.75 + 'rem' }} />
                    </div>
                </div>
                <Main noScroll>
                    <div styleName='swiper-container' ref={el => { this.container = el }} >
                        <div styleName='swiper-wrapper' style={{ left: -this.state.index * 7.5 + 'rem' }}>
                            <List styleName='swiper-slide' load={this.loadList.bind(this, 0)}>
                                {(item, index) => (
                                    <a styleName='list-item' href={'http://www.cnaidai.com/webpc/help/wechat_detail_' + item.id + '.html'} key={index}>
                                        <div >{item.title}</div>
                                        <div styleName='time'>{item.addtime || item.createDate}</div>
                                        <i styleName='icon-1 icon-right-arrow' />
                                    </a>
                                )}
                            </List>
                            <List styleName='swiper-slide' load={this.loadList.bind(this, 1)}>
                                {(item, index) => (
                                    <a styleName='list-item' href={'message.html?id=' + item.id} key={index}>
                                        <div>{item.title}</div>
                                        <div styleName='time'>{item.addtime || item.createDate}</div>
                                        <i styleName='icon-1 icon-right-arrow' />
                                    </a>
                                )}
                            </List>
                        </div>
                    </div>
                </Main>

            </Page>
        )
    }
}
