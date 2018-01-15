
import React, { Component } from 'react'

import { Page, Main } from 'src/component/page'

import './intro.less'

export default class Intro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            btnstate: true
        }
    }
    onclick = () => {
        if (this.state.btnstate) {
            this.setState({
                btnstate: false
            })
        } else {
            this.setState({
                btnstate: true
            })
        }
    }
    render() {
        return (
            <Page>
                <Main>
                    <div styleName='m-con-intro'>
                        <div styleName='m-con1-intro'>
                            <h2>— 爱贷网介绍  —</h2>
                            <p>浙江爱贷金融服务外包股份有限公司成立于2012年，总部位于浙江杭州，注册资金7000万元，爱贷网是国内首批互联网金融交易平台之一。自创立以来，爱贷网始终坚持“以互联网思维发展金融”和“用大数据系统进行风控”的经营理念，致力于为中小企业提供供应链金融服务、企业融资服务和个人循环授信服务；致力于为有资金需求和理财需求的个人和企业搭建一个安全、专业、高效、透明的互联网金融平台，推动解决利率市场化进程中投资渠道窄和融资难的问题，实现合作共赢。</p>
                        </div>
                        <div styleName='m-con2-intro'>
                            <h2>— 企业荣誉  —</h2>
                            <h3>Enterprise honor</h3>
                            <div styleName='honor_show'>
                                <i styleName='icon_honor ' className='honor01' />
                                <i styleName='icon_honor honor02' />
                                <i styleName='icon_honor honor03' />
                                <i styleName='icon_honor honor04' />
                                <i styleName='icon_honor honor05' />
                                <i styleName='icon_honor honor06' />
                            </div>
                            {
                                !this.state.btnstate ? (
                                    <div styleName='honor_hide'>
                                        <i styleName='icon_honor honor07' />
                                        <i styleName='icon_honor honor08' />
                                        <i styleName='icon_honor honor09' />
                                        <i styleName='icon_honor honor10' />
                                        <i styleName='icon_honor honor11' />
                                        <i styleName='icon_honor honor12' />
                                        <i styleName='icon_honor honor13' />
                                        <i styleName='icon_honor honor15' />
                                    </div>
                                ) : ''
                            }
                            <p styleName='more_btn' onClick={this.onclick}> {this.state.btnstate ? ('点击查看更多荣誉 > >') : ('关闭 > >')}</p>
                        </div>
                        <div styleName='m-con3-intro'>
                            <h2>— 企业资质  —</h2>
                            <h3>Enterprise Qualification</h3>
                            <div styleName='aptitude'>
                                <i styleName='icon_aptitude' className='aptitude01' />
                                <i styleName='icon_aptitude aptitude02' />
                                <i styleName='icon_aptitude aptitude03' />
                                <i styleName='icon_aptitude aptitude04' />
                            </div>
                        </div>
                        <div styleName='m-con4-intro'>
                            <h2>— 企业环境  —</h2>
                            <h3>Enterprise environment</h3>
                            <div styleName='m-conbox-intro'>
                                <div styleName='m-box-intro'>
                                    <ul styleName='m-list-intro'>
                                        <li><img src='/wechatlicai/src/pages/more/intro/intro1.png' styleName='f-fl' /></li>
                                        <li><img src='/wechatlicai/src/pages/more/intro/intro2.png' styleName='f-fl' /></li>
                                        <li><img src='/wechatlicai/src/pages/more/intro/intro3.png' styleName='f-fl' /></li>
                                        <li><img src='/wechatlicai/src/pages/more/intro/intro4.png' styleName='f-fl' /></li>
                                        <li><img src='/wechatlicai/src/pages/more/intro/intro5.png' styleName='f-fl' /></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Main >
            </Page >
        )
    }
}
