/* global Chart */
import React, { Component } from 'react'
import request from 'src/lib/request'
import { Page, Header, Main } from 'src/component/page'
import './totalAssets.less'
export default class TotalAssets extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
        }
    }
    async componentDidMount() {
        if (typeof Chart === 'undefined') {
            var element = document.createElement('script')
            element.src = 'https://icdn.cnaidai.com/aidai/webchat/static/js/mine/Chart.min.js'
            document.body.appendChild(element)
        }
        try {
            const response = await request('mine/earnings/mineAccountDataService', undefined, { credentials: 'include' })
            this.setState({...response})
            var balance = response.accUsable || 0.00
            var total = response.accCollection || 0.00
            var wallet = response.accDayincome || 0.00
            var noUse = response.accNoUseMoney || 0.00
            var allTotal = parseFloat(balance) + parseFloat(total) + parseFloat(wallet) + parseFloat(noUse)
            var doughnutData
            if (allTotal === 0) {
                doughnutData = [{value: 1, color: '#c4c4c4'}]
            } else {
                doughnutData = [
                    {
                        value: parseInt(balance),
                        color: '#fe4646'
                    },
                    {
                        value: parseInt(total),
                        color: '#feb359'
                    },
                    {
                        value: parseInt(wallet),
                        color: '#54aeff'
                    },
                    {
                        value: parseInt(noUse),
                        color: '#2dc288'
                    }
                ]
            }

            new Chart(document.getElementById('canvas').getContext('2d')).Doughnut(doughnutData, {
                segmentShowStroke: true, // 圆环间不要间隔
                percentageInnerCutout: 70, // 改变圆环半径
                animationSteps: 30, // 动画速度
                animationEasing: 'easeOutSine'// 动画特效
            })

            document.getElementById('canvas').style.height = '100%'
            document.getElementById('canvas').style.width = '100%'
        } catch (err) {

        }
    }
    render() {
        return (
            <Page>
                <Header title='总资产' />
                <Main styleName='mine-totalAssets'>
                    <section styleName="u-total">
                        <p>{this.state.accTotal ? this.state.accTotal : '-'}</p>
                        <span>可用余额+待收总额+冻结资金</span>
                    </section>
                    <section styleName="u-chart">
                        <p styleName="u-tt">资产分析</p>
                        <canvas id="canvas" style={{'display': 'block', 'textAlign': 'center', 'margin': '1.2rem auto'}}/>
                        <div styleName="u-sum">
                            <p>总资产(元)</p>
                            <span>{this.state.accTotal ? this.state.accTotal : '-'}</span>
                        </div>
                        <div styleName="u-menu">
                            <p><em styleName="c-red" />可用余额：<span>{this.state.accUsable ? this.state.accUsable : '-'}</span></p>
                            <p><em styleName="c-yellow" />待收总额：<span>{this.state.dueInTotal ? this.state.dueInTotal : '-'}</span></p>
                            {/* <p><em styleName="c-blue" />爱贷钱包：<span>{this.state.wallet ? this.state.wallet : '-'}</span></p> */}
                            <p><em styleName="c-green" />冻结金额：<span>{this.state.accNoUseMoney ? this.state.accNoUseMoney : '-'}</span></p>
                        </div>
                    </section>
                </Main>
            </Page>
        )
    }
}
