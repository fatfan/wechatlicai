import React, { Component, ReactDOM } from "react";
import reactDOM, { render } from "react-dom";
// import 'whatwg-fetch';
import fetch from 'isomorphic-fetch'
// import { connect } from 'react-redux'
// import { BrowserRouter, StaticRouter, Route, Link, hashHistory, NavLink } from 'react-router-dom';

import "./login.less";

//引入组件
import Header from "../../component/cmn/header/header.jsx";
import Tabs from "../../component/cmn/tabs/tabs.jsx";

export default class Index extends Component {
    render() {
        return (<div className="index-page" ref="aaa">
            <Header title="登录" />
            <main style={{ paddingTop: "0.88rem" }}>
                <div className="g-cnt">
                    <div className="icon-logo">&#xe610;</div>
                    <p className="m-message">aaa</p>
                    <div className="m-login">
                        <div className="u-input username">
                            <label htmlFor="username">用户名</label>
                            <input type="text" placeholder="请输入用户名/手机号" ref="username" autoComplete="off" onChange={(e) => { this.handleChangeUsername(e) }} />
                        </div>
                        <div className="u-input password">
                            <label htmlFor="password">登录密码</label>
                            <input type="password" placeholder="密码" ref="password" autoComplete="off" onChange={(e) => { this.handleChangePassword(e) }} />
                            <em className="icon-eye J_eye">&#xe60d;</em>
                            <em className="icon-eye J_eyeopen" style={{ "display": "none" }}>&#xe60e;</em>
                        </div>

                        <a href="javascript:;" type="text" className={this.state.enableLogin ? "u-submit" : "u-submit disable"} onClick={() => { console.log("click"); this.doLogin() }}>登&nbsp;&nbsp;录</a>
                        <div className="f-fr"><a href="register.html" style={{ "fontSize": "14px", "color": "#4C8CF8", "paddingRight": "15px" }}>注册领取188元红包</a></div>
                        <div className="f-fl"><a href="getpasswd.html" style={{ "fontSize": "14px", "color": "#666", "paddingLeft": "15px" }}>忘记密码？</a></div>
                    </div>
                </div>
            </main>
            {/* <Tabs cur="0" /> */}
        </div >)
    }
    constructor(prop) {
        super(prop);
        this.state = {
            username: "",
            password: "",
            enableLogin: false
        }
    }
    componentDidMount() {
        var startX;
        var finishX;

        // this.banner.addEventListener('touchstart', (evt) => {
        //     evt.preventDefault();
        //     startX = evt.touches[0].pageX;
        // }, false);
        // this.banner.addEventListener('touchend', (evt) => {
        //     finishX = evt.changedTouches[0].pageX;
        //     if ((finishX - startX) < 0) {
        //         this.scrollBanner(1);
        //     }
        //     if ((finishX - startX) > 0) {
        //         //alert("向左");
        //         this.scrollBanner(0);
        //     }
        // }, false);
        // fetch('/users.json')
        //     .then(function (response) {
        //         return response.json()
        //     }).then(function (json) {
        //         console.log('parsed json', json)
        //     }).catch(function (ex) {
        //         console.log('parsing failed', ex)
        //     });
        // fetch('//offline-news-api.herokuapp.com/stories')
        //     .then(function (response) {
        //         if (response.status >= 400) {
        //             throw new Error("Bad response from server");
        //         }
        //         return response.json();
        //     })
        //     .then(function (stories) {
        //         console.log(stories);
        //     });
    }

    doLogin = (e) => {
        console.log(
            "dologin called..."
        )
        var data = "username=" + this.state.username + "&password=" + this.state.password;

        fetch('/wechatlicai/src/datapi/login.cgi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // crossDomain: true,
            // xhrFields: { withCredentials: true },
            // withCredentials: true,
            credentials: 'include',
            body: data
        })
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (rslt) {
                console.log(rslt);
                if (rslt.code != 200) {
                    console.log("用户名或密码错误")
                } else {
                    console.log("登录成功")
                    location.href = "#/mine";
                }

            });
    }

    handleChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
            // enableLogin: !!this.refs["username"].value && !!this.refs["password"].value,
            enableLogin: !!e.target.value && !!this.state.password
        })
        // console.log(this.refs["username"].value + " " + this.refs["password"].value)
    }
    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value,
            enableLogin: !!this.state.username && !!e.target.value
        })
        // console.log(this.refs["username"].value + " " + this.refs["password"].value)
    }
    moveTest = (e) => {

    }
}