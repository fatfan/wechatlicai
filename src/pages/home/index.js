import React, { PureComponent } from 'react'
import { Link, Route } from 'react-router-dom'

import request from 'src/lib/request'

import AppTabBar from 'src/component/app-tab-bar'
import { Page, Main } from 'src/component/page'
import PullToRefresh from 'src/component/pull-to-refresh'

import { Invest } from 'src/pages/invest'
import { Mine } from 'src/pages/mine'
import { More } from 'src/pages/more'

import BidItem from 'src/component/cmn/bidItem'

import './index.less'

class Home extends PureComponent {
    constructor(prop) {
        super(prop)
        this.state = {
            scrollPicList: [],
            indexBorrowList: [],
            realTimeFinancial: {},
            index: 0
        }
    }

    componentDidMount() {
        var startX
        var finishX

        this.container.addEventListener('touchstart', (evt) => {
            evt.preventDefault()
            startX = evt.touches[0].pageX
        }, false)
        this.container.addEventListener('touchend', (evt) => {
            finishX = evt.changedTouches[0].pageX
            if ((finishX - startX) < 0) {
                this.scrollBanner(1)
            }
            if ((finishX - startX) > 0) {
                this.scrollBanner(0)
            }
        }, false)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    scrollBanner = (value) => {
        clearInterval(this.timer)

        this.setState((prevState, props) => {
            if (value === 0) {
                if (prevState.index !== 0) {
                    return {
                        index: prevState.index + 1
                    }
                }
            } else if (value === 1) {
                if (Math.abs(prevState.index) < (prevState.scrollPicList.length - 1)) {
                    return {
                        index: prevState.index - 1
                    }
                }
            }
        }, () => {
            this.autoScoll()
        })
    }

    handleDotClick = (i, e) => {
        clearInterval(this.timer)

        this.setState({
            index: -i
        }, () => {
            this.autoScoll()
        })
    }

    autoScoll = () => {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
            this.setState((prevState, props) => {
                if (Math.abs(prevState.index) === (prevState.scrollPicList.length - 1)) {
                    return {
                        index: 0
                    }
                } else {
                    return {
                        index: prevState.index - 1
                    }
                }
            })
        }, 3000)
    }

    load = async () => {
        const result = await request('invest/list')

        if (result.code === 0) {
            this.setState({
                scrollPicList: result.scrollPicList.scrollPicList,
                indexBorrowList: result.indexBorrowList,
                realTimeFinancial: result.realTimeFinancial
            })

            this.autoScoll()
        }
    }

    formatNumber = (value) => {
        var units = ['', '万 ', '亿 ']
        var result = ''
        var i = 0
        while (value !== 0 && i < units.length) {
            var remainder = value % 10000
            result = remainder + units[i++] + result
            value = (value - remainder) / 10000
        }
        return result
    }

    render() {
        return (
            <Main noScroll>
                <PullToRefresh reload={this.load}>
                    <section styleName='banner-container'>
                        <div styleName='container' ref={el => { this.container = el }}>
                            <ul styleName='wrapper' ref={el => { this.wrapper = el }} style={{
                                width: this.state.scrollPicList.length * 7.5 + 'rem',
                                height: '3rem',
                                left: this.state.index * 7.5 + 'rem'
                            }}>
                                {this.state.scrollPicList.map((value, index) => {
                                    return (
                                        <li key={index}>
                                            <a href={value.url} style={{ 'backgroundImage': 'url(https://adtp.cnaidai.com/' + value.pic + ')' }} />
                                        </li>)
                                })}
                            </ul>
                            <ul styleName='pagination'>
                                {this.state.scrollPicList.map((value, index) => {
                                    return <li styleName={Math.abs(this.state.index) === index ? 'current' : ''} key={index} onClick={this.handleDotClick.bind(this, index)} onTouchStart={this.handleDotClick.bind(this, index)} />
                                })}
                            </ul>
                        </div>
                        <Link styleName='notification' to="/more/notice" />
                    </section>
                    <section styleName='list-container'>
                        {this.state.indexBorrowList.map(function(item, i) {
                            if (i === 0) {
                                return (
                                    <BidItem key={item.id} {...item} className='list-item-big' bidType={1} />
                                )
                            }
                            return (
                                <BidItem key={item.id} {...item} />
                            )
                        })}
                    </section>
                    <section styleName='section-achievements' >
                        <div>
                            <span>用户总数</span>
                            <span styleName='user-count'>{this.state.realTimeFinancial.userCount && this.formatNumber(this.state.realTimeFinancial.userCount)}位</span>
                        </div>
                        <div>
                            <span>累计成交</span>
                            <span styleName='transaction-count'>{this.state.realTimeFinancial.borrowTotal && this.formatNumber(this.state.realTimeFinancial.borrowTotal)}元</span>
                        </div>
                    </section>
                    <section styleName='section-advantage'>
                        <a styleName='advantage-item' href='http://wechat.cnaidai.com/webchat/activity/safeLevel/index.html'>三级等保测评</a>
                        <a styleName='advantage-item' href='http://wechat.cnaidai.com/webchat/activity/6year_activity/index.html'>6年老品牌</a>
                        <a styleName='advantage-item' href='http://wechat.cnaidai.com/webchat/activity/icpShow/index.html'>ICP合规经营</a>
                    </section>

                    <section styleName='section-safe'>
                        <i styleName='icon-security' />
                        <span>您的资金由财险机构和第三方共同保障</span>
                    </section>

                    <section styleName='section-app'>
                        <a href="https://pc.cnaidai.com/webpc/qrcode/download.htm">客户端</a>
                        <a href="http://www.cnaidai.com?viewType=desktop">电脑版</a>
                    </section>
                </PullToRefresh>
            </Main>
        )
    };
}

export default function HomeRouter({ match }) {
    return (
        <Page>
            <Route exact path="/" component={Home} />
            <Route path="/invest" component={Invest} />
            <Route path="/mine" component={Mine} />
            <Route path="/more" component={More} />

            <AppTabBar />
        </Page>
    )
}
