import React, { Component } from "react";
// import 'whatwg-fetch';
import fetch from 'isomorphic-fetch'

import "../../component/cmn/bidItem/bidItem.less";
import "./invest.less";
//引入组件
//引入组件
import Tabs from "../../component/cmn/tabs/tabs.jsx";
import Header from "../../component/cmn/header/header.jsx";
import BidItem from "../../component/cmn/bidItem/bidItem.jsx";

export default class Index extends Component {
    render() {
        return (<div>
            <Header />
            <main style={{ paddingTop: "0.88rem" }}>
                <section className="list-container">
                    <BidItem />
                    <BidItem />
                </section>

                <a className="more" href="invest/repaying.html">
                    <span>已售罄项目</span>
                    <span className="repaying"></span>
                    <span>个，已还款项目</span>
                    <span className="repayed"></span>
                    <span>个，点击查看</span>
                </a>
            </main>
            <Tabs cur="1" />
        </div>)
    }
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }
    componentDidMount() {
        fetch('//offline-news-api.herokuapp.com/stories')
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (stories) {
                console.log(stories);
            });
    }
}

// const Invest = () => (

// )
// export default Invest