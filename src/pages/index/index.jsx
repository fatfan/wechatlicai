import React, { Component, ReactDOM } from "react";
import reactDOM, { render } from "react-dom";
// import 'whatwg-fetch';
// import fetch from 'isomorphic-fetch'
// import { connect } from 'react-redux'
// import { BrowserRouter, StaticRouter, Route, Link, hashHistory, NavLink } from 'react-router-dom';

//引入样式
import "./index.less";

//引入组件
import Tabs from "../../component/cmn/tabs/tabs.jsx";

export default class Index extends Component {
    render() {
        return (<div className="index-page" ref="aaa">
            <main>
                <div className="banner-box" ref={el => { this.banner = el }}>
                    <ul className="ul-box" ref={el => { this.ulBox = el }} style={{
                        width: this.state.list.length * 7.5 + "rem",
                        height: "3rem",
                        left: this.state.index * 7.5 + "rem"
                    }}>
                        {this.state.list.map((value, index) => {
                            return <li key={index}>{value}</li>
                        })}
                    </ul>
                    <ul className="changeBtn">
                        {this.state.list.map((value, index) => {
                            return <li className={Math.abs(this.state.index) == index ? "current" : ""} key={index}></li>
                        })}
                    </ul>
                    <a className="left" onClick={() => { this.scrollBanner(0) }}>{"<"}</a>
                    <a className="right" onClick={() => { this.scrollBanner(1) }}>{">"}</a>
                </div>
            </main>
            <Tabs cur="0" />
        </div>)
    }
    constructor(prop) {
        super(prop);
        this.state = {
            list: [1, 2, 3, 4, 5, 6],
            index: 0
        }
    }
    componentDidMount() {
        var startX;
        var finishX;

        this.banner.addEventListener('touchstart', (evt) => {
            evt.preventDefault();
            startX = evt.touches[0].pageX;
        }, false);
        this.banner.addEventListener('touchend', (evt) => {
            finishX = evt.changedTouches[0].pageX;
            if ((finishX - startX) < 0) {
                this.scrollBanner(1);
            }
            if ((finishX - startX) > 0) {
                //alert("向左");
                this.scrollBanner(0);
            }
        }, false);
    }
    scrollBanner = (value) => {
        this.setState((prevState, props) => {
            if (value == 0) {
                if (prevState.index != 0) {
                    return {
                        index: prevState.index + 1
                    }
                }
            } else if (value == 1) {
                if (Math.abs(prevState.index) < (prevState.list.length - 1)) {
                    return {
                        index: prevState.index - 1
                    }
                }
            }
        });
    }
    moveTest = (e) => {

    }
}