/* global qrcode */
import React, { Component } from 'react'
import request from 'src/lib/request'
import { Page, Header, Main } from 'src/component/page'

import './QRcode.less'
if (typeof qrcode === 'undefined') {
    var element = document.createElement('script')
    element.src = 'https://icdn.cnaidai.com/aidai/webchat/static/js/cmn/jquery-1.12.0.min.js'
    document.body.appendChild(element)
    var element2 = document.createElement('script')
    element2.src = 'https://icdn.cnaidai.com/aidai/webchat/static/js/mine/jquery-qrcode.min.js'
    document.body.appendChild(element2)
}

// 生成二维码
function creatQRcode(userName) {
    window.jquery('#qrcode').qrcode({
        // render 方式: 'canvas', 'image' or 'div'//用image适配方便
        render: 'image',

        // 容错等级: 'L', 'M', 'Q' or 'H'
        ecLevel: 'L',

        // 控制canvas 偏移
        left: 0,
        top: 0,

        // 控制二维码尺寸
        size: 320,

        // 控制二维码颜色
        fill: '#000',

        // background color or image element, null for transparent background
        background: null,

        // 二维码内容
        text: 'https://wechat.cnaidai.com/webchat/register.html?userName=' + encodeURIComponent(userName),
        // text: 'https://wap.cnaidai.com/wap/register.html?user_id='+userId,

        // 控制二维码的圆角: 0.0 .. 0.5
        radius: 0,

        // 边缘留空，默认0
        quiet: 0
    })
}
export default class Qrcode extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
        }
    }
    async componentDidMount() {
        try {
            const response = await request('mine/userInfoDataService')
            this.setState({ ...response })
            var userName = response.username
            creatQRcode(userName)
        } catch (err) {

        }
    }

    render() {
        return (
            <Page>
                <Header title="我的二维码"/>
                <Main>
                    <section styleName="m-qrcode">
                        <div id="qrcode"/>
                    </section>
                </Main>
            </Page>
        )
    }
}
