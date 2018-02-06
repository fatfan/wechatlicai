import React, { Component } from 'react'
import request from 'src/lib/request'
import { Page, Header, Main } from 'src/component/page'
import Input from 'src/component/input'
import './phoneverify.less'

export default class Phoneverify extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
        }
    }
    async componentDidMount() {
        try {
            const response = await request('mine/userInfoDataService')
            this.setState({ ...response })
        } catch (err) {

        }
    }
    handlePhoneChange = (value) => {
        this.setState({
            value
        })
    }
    handleCodeChange = (value2) => {
        this.setState({
            value2
        })
    }
    render() {
        return (
            <Page>
                <Header title='手机认证'/>
                <Main styleName='mine-phoneVarify'>
                    <section styleName="m-form ofh">
                        <form action="" id="phoneVerify" target="noReload">
                            <Input type="number" placeholder='请输入手机号' value={this.state.value} onChange={this.handlePhoneChange} height={101} fontSize={32}/>
                            <div styleName="m-code ofh">
                                <Input type="number" placeholder='填写验证码' value={this.state.value2} onChange={this.handleCodeChange} height={101} fontSize={32}/>
                                <input id="phone-code" data-type="3" type="button" styleName="getValidCode" value="获取验证码"/>
                            </div>
                            <input type="submit" value="提交"/>
                        </form>
                        <p>*温馨提示：我们将对所有的信息进行保密。 如果您长期未收到短信，可咨询400-888-6365进行人工认证</p>
                    </section>
                </Main>
            </Page>
        )
    }
}
