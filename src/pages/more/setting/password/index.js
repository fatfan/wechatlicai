import React, { Component } from 'react'

import { Page, Header, Main } from 'src/component/page'
// import request from 'src/lib/request'

import './password.less'

export default class password extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            oldPassword: '',
            newPassword1: '',
            newPassword2: '',
            wordState: false
        }
    }
    componentDidMount() {
        document.documentElement.style.background = '#fff'
    }
    onInputBlur = (e) => {
        this.setState({
            oldPassword: e.target.value,
            // enableLogin: !!this.refs["username"].value && !!this.refs["password"].value,
            enableLogin: !!e.target.value && !!this.state.password
        })
    }

    // loadList = async (type, page) => {
    //     const result = await request(`more/${type === 0 ? 'noticeHtmService' : 'personInfoHtmService'}`, { page: page + 1, rows: 15 })
    //     if (result.code === 0) {
    //         return {
    //             list: result.noticeList,
    //             ended: result.noticeList.length !== 10
    //         }
    //     } else {
    //         throw new Error()
    //     }
    // }
    render() {
        return (
            <Page>
                <Header title='修改登录密码' />
                <Main>
                    <div styleName ='m-bd-change' style={{marginTop: '.2rem'}}>
                        <form id='changePayPasswordForm'>
                            <div className ='m-bd-con-change'>
                                <div styleName='m-bd-input-change'>
                                    <input type='password' styleName='u-bd-input-change' name='oldPassword' id='oldPassword' autoComplete="off" placeholder='原登录密码' maxLength="18" />
                                    <p styleName='tips-box' style={{display: 'none'}}>
                                        <em><img src='https://icdn.cnaidai.com/aidai/webchat/static/img/icon-warn.png' /></em>
                                        <span />
                                    </p>
                                </div>
                                <div styleName='m-bd-input-change'>
                                    <input type='password' styleName='u-bd-input-change' name='newPassword' id='newPassword' placeholder='新登录密码(8-16位数字，字母组合)' maxLength="18" />
                                    <p styleName='tips-box' style={{display: 'none'}}>
                                        <em><img src='https://icdn.cnaidai.com/aidai/webchat/static/img/icon-warn.png' /></em>
                                        <span />
                                    </p>
                                </div>
                                <div styleName='m-bd-input-change'>
                                    <input type='password' styleName='u-bd-input-change' name='newPassword1' id='newPassword1' placeholder='确认新登录密码' maxLength="18" />
                                    <p styleName='tips-box' style={{display: 'none'}}>
                                        <em><img src='https://icdn.cnaidai.com/aidai/webchat/static/img/icon-warn.png' /></em>
                                        <span />
                                    </p>
                                </div>
                            </div>
                            <div styleName='m-bd-button-change'>
                                <button type='button' styleName='u-bd-button-change' name='register' id='submit' >提交</button>
                            </div>
                            <div id='msg' style={{display: 'none'}}/>
                        </form>
                    </div>
                </Main>

            </Page >
        )
    }
}
