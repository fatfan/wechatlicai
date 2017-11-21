import React, { Component } from "react";
import { HashRouter as Router, StaticRouter, Route, Link, hashHistory, NavLink, IndexRoute } from 'react-router-dom';
// import 'whatwg-fetch';
import fetch from 'isomorphic-fetch'

import "../../component/cmn/bidItem/bidItem.less";
import "./invest.less";
//引入组件
//引入组件
import Tabs from "../../component/cmn/tabs/tabs.jsx";
import Header from "../../component/cmn/header/header.jsx";
import BidItem from "../../component/cmn/bidItem/bidItem.jsx";
import BidDetail from "./biddetail/biddetail.jsx";

class Index extends Component {
    render() {
        return (
            <div>
                <Header title="投资" />
                <main style={{ paddingTop: "0.88rem" }}>
                    <section className="list-container">
                        {this.state.bidList.map(function (item, i) {
                            return (

                                <BidItem key={i} name={item.name} bid={item.bid} apr={item.apr} limit={item.limit} flowmoney={item.flowmoney} tagname={item.tagName} rate={item.rate} />
                            )
                        })}
                    </section>

                    <a className="more" href="invest/repaying.html">
                        <span>已售罄项目</span>
                        <span className="repaying">{this.state.flowRepayingCount}</span>
                        <span>个，已还款项目</span>
                        <span className="repayed">{this.state.flowRepayedCount}</span>
                        <span>个，点击查看</span>
                    </a>
                </main>
                <button onClick={() => { this.refreshList() }}>更新</button>
                <Tabs cur="1" />
            </div>

        )
    }
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            flowRepayingCount: "",
            flowRepayedCount: "",
            bidList: [

            ]
        };
    }
    refreshList() {
        // alert(1);

        // this.state.bidList = [
        //     {
        //         "name": "aa",
        //         "bid": "11111",
        //         "apr": 12,
        //         "limit": 3
        //     }, {
        //         "name": "ab",
        //         "bid": "11112",
        //         "apr": 12,
        //         "limit": 3
        //     }, {
        //         "name": "ac",
        //         "bid": "11113",
        //         "apr": 10,
        //         "limit": 3
        //     }
        // ];
        this.setState({
            bidList: [
                {
                    "name": "企融贷-aa",
                    "bid": "11111",
                    "apr": 12,
                    "limit": 3,
                    "flowmoney": 100,
                    "tagName": "金秋送爽",
                    "rate": 100
                }, {
                    "name": "企融贷-ab",
                    "bid": "11112",
                    "apr": 12,
                    "limit": 3,
                    "flowmoney": 100,
                    "tagName": "突破80亿",
                    "rate": 100
                }, {
                    "name": "企融贷-ac",
                    "bid": "11113",
                    "apr": 10,
                    "limit": 3,
                    "flowmoney": 100,
                    "tagName": "金秋送爽",
                    "rate": 98
                }
            ]
        });
        console.log("aaaaaaaaaaa");
    }

    componentDidMount() {
        //'//offline-news-api.herokuapp.com/stories'
        var that = this;

        fetch('//localhost/webpc/test/get.cgi')
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (rslt) {
                console.log(rslt);
                if (rslt.code == 200 && rslt.list) {
                    // this.state.bidList = rslt.list;

                    that.setState({
                        flowRepayingCount: rslt.flowRepayingCount || "",
                        flowRepayedCount: rslt.flowRepayedCount || "",
                        // bidList: [
                        //     {
                        //         "name": "企融贷-aa",
                        //         "bid": "11111",
                        //         "apr": 12,
                        //         "limit": 3,
                        //         "flowmoney": 100,
                        //         "tagName": "金秋送爽",
                        //         "rate": 98
                        //     }, {
                        //         "name": "企融贷-ab",
                        //         "bid": "11112",
                        //         "apr": 12,
                        //         "limit": 3,
                        //         "flowmoney": 100,
                        //         "tagName": "突破80亿",
                        //         "rate": 90
                        //     }, {
                        //         "name": "企融贷-ac",
                        //         "bid": "11113",
                        //         "apr": 10,
                        //         "limit": 3,
                        //         "flowmoney": 100,
                        //         "tagName": "金秋送爽",
                        //         "rate": 98
                        //     }
                        // ]
                        bidList: rslt.list
                    });

                }
            });
    }
}

const More = ({ match }) => (
    <div>
        <Route exact path={match.url} component={Index} />
        <Route path={`${match.url}/bidDetail/:bid`} component={BidDetail} />

    </div>

)
export default More