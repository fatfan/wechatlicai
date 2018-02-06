/* global Chart */
import React, { Component } from 'react'
import request from 'src/lib/request'
import { Page, Header, Main } from 'src/component/page'
import './earnings.less'
export default class Earnings extends Component {
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
            const response = await request('mine/earnings/userTotalEarnings', undefined, { credentials: 'include' })
            this.setState({ ...response })
            var hadInterest = response.earnedInterest || 0.00
            var waitInterest = response.collectInterest || 0.00
            var hadEarnings = response.earnedRebate || 0.00
            var others = response.other || 0.00
            var totalEarning = response.totalEarning || '0.00'
            var doughnutData
            // 要换算成每个值在总额中所占的比例
            if (totalEarning === '0.00') {
                doughnutData = [{value: 1, color: '#c4c4c4'}]
            } else {
                doughnutData = [
                    {
                        value: parseInt(hadInterest.replace(/,/g, '')),
                        color: '#fe4646'
                    },
                    {
                        value: parseInt(waitInterest.replace(/,/g, '')),
                        color: '#feb359'
                    },
                    {
                        value: parseInt(hadEarnings.replace(/,/g, '')),
                        color: '#54aeff'
                    },
                    {
                        value: parseInt(others.replace(/,/g, '')),
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
            document.getElementById('canvas').style.width = '100%'
            document.getElementById('canvas').style.height = '100%'
        } catch (err) {

        }
    }
    render() {
        return (
            <Page>
                <Header title='我的收益' />
                <Main styleName='mine-totalAssets'>
                    <section styleName='u-total'>
                        <p>{this.state.totalEarning ? this.state.totalEarning : '-'}</p>
                        <span>您在爱贷网理财累计获得收益（元）</span>
                    </section>
                    <section styleName='u-chart'>
                        <p styleName='u-tt'>收益分析</p>
                        <canvas id="canvas" style={{'display': 'block', 'textAlign': 'center', 'margin': '1.2rem auto'}}/>
                        <div styleName='u-sum'>
                            <p>累计收益(元)</p>
                            <span>{this.state.totalEarning ? this.state.totalEarning : '-'}</span>
                        </div>
                        <div styleName='u-menu'>
                            <p><em styleName='c-red' />已赚利息：<span>{this.state.earnedInterest ? this.state.earnedInterest : '-'}</span></p>
                            <p><em styleName='c-yellow' />待收利息：<span>{this.state.collectInterest ? this.state.collectInterest : '-'}</span></p>
                            <p><em styleName='c-blue' />已赚返利：<span>{this.state.earnedRebate ? this.state.earnedRebate : '-'}</span></p>
                            <p><em styleName='c-green' />其他：<span>{this.state.other ? this.state.other : '-'}</span></p>
                        </div>
                    </section>
                    <script src="./echarts.min.js"/>
                </Main>
            </Page>
        )
    }
}
