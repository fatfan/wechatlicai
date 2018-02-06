import React, { Component } from 'react'
import request from 'src/lib/request'
import { Page, Header, Main } from 'src/component/page'
import Input from 'src/component/input'
import './nameverify.less'

export default class Nameverify extends Component {
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
    handleNameChange = (value) => {
        this.setState({
            value
        })
    }
    handleIdChange = (value2) => {
        this.setState({
            value2
        })
    }
    render() {
        return (
            <Page>
                <Header title='实名认证'/>
                <Main styleName='mine-nameVarify'>
                    <section styleName='m-form ofh'>
                        <p styleName='u-tip'>实名认证信息：请填写真实信息，核实后无法修改</p>
                        <form>
                            <div styleName='m-realName'>
                                <Input type="text" placeholder='真实姓名' value={this.state.value} onChange={this.handleNameChange} height={101} fontSize={32}>
                                    <span>真实姓名</span>
                                </Input>
                            </div>
                            <div styleName='m-idCard'>
                                <Input type="number" placeholder='身份证号码' value={this.state.value2} onChange={this.handleIdChange} height={101} fontSize={32}>
                                    <span>身份证号码</span>
                                </Input>
                            </div>
                            <p id='u-showValue' style={{'display': 'none'}} />
                            <p styleName='u-mark'>＊真实姓名请填写本人与绑卡一致的姓名</p>
                            <input type='submit' value='下一步'/>
                            <p styleName='u-remark'>爱贷网提供<em>2次免费</em>实名认证的机会，请谨慎填写您的信息</p>
                        </form>
                    </section>
                </Main>
            </Page>
        )
    }
}
